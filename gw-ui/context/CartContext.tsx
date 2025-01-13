'use client'

import React, { createContext, useState, useContext, useEffect } from "react"
import axiosConfig from '@/config/axiosConfig'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: CartItem) => Promise<void>
  incrementQuantity: (id: number) => Promise<void>
  decrementQuantity: (id: number) => Promise<void>
  removeItem: (id: number) => Promise<void>
  clearCart: () => Promise<void>
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = async (product: CartItem) => {
    try {
      setIsLoading(true)
      const existingItem = cartItems.find(item => item.id === product.id)
      
      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        ))
      } else {
        setCartItems([...cartItems, product])
      }
      
      await axiosConfig.post(`/api/cart/add/${product.id}`, {
        quantity: product.quantity
      })
    } catch (err) {
      console.error('Failed to add item to cart:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const incrementQuantity = async (id: number) => {
    try {
      setIsLoading(true)
      setCartItems(cartItems.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
      
      const item = cartItems.find(item => item.id === id)
      if (item) {
        await axiosConfig.put(`/api/cart/update/${id}?quantity=${item.quantity + 1}`)
      }
    } catch (err) {
      console.error('Failed to increment quantity:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const decrementQuantity = async (id: number) => {
    try {
      setIsLoading(true)
      const item = cartItems.find(item => item.id === id)
      if (item && item.quantity > 1) {
        setCartItems(cartItems.map(cartItem =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ))
        await axiosConfig.put(`/api/cart/update/${id}?quantity=${item.quantity - 1}`)
      }
    } catch (err) {
      console.error('Failed to decrement quantity:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async (id: number) => {
    try {
      setIsLoading(true)
      setCartItems(cartItems.filter(item => item.id !== id))
      await axiosConfig.delete(`/api/cart/remove/${id}`)
    } catch (err) {
      console.error('Failed to remove item:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setIsLoading(true)
      setCartItems([])
      await axiosConfig.delete('/api/cart/clear')
    } catch (err) {
      console.error('Failed to clear cart:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        clearCart,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 