'use client'

import React, { createContext, useState, useContext, useEffect } from "react"
import axiosConfig from '@/config/axiosConfig'
import useAuth from '@/hooks/useAuth'

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
  const { isLoggedIn } = useAuth()

  // Загружаем корзину при монтировании и при изменении статуса авторизации
  useEffect(() => {
    console.log('Fetching cart, isLoggedIn:', isLoggedIn)
    if (isLoggedIn) {
      fetchCart()
    } else {
      setCartItems([]) // Очищаем корзину если пользователь не авторизован
    }
  }, [isLoggedIn]) // Добавляем зависимость от isLoggedIn

  const fetchCart = async () => {
    try {
      setIsLoading(true)
      console.log('Starting fetchCart')
      const response = await axiosConfig.get('/api/cart')
      console.log('Cart response:', response.data)
      const cartData = response.data.cartItem.map((item: any) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.countProducts
      }))
      setCartItems(cartData)
    } catch (err) {
      console.error('Failed to fetch cart:', err)
      if ((err as any)?.response?.status === 401) {
        setCartItems([])
      }
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (product: CartItem) => {
    try {
      setIsLoading(true)
      await axiosConfig.post('/api/cart/add', {
        productId: product.id,
        productCount: product.quantity
      })
      await fetchCart()
    } catch (err) {
      console.error('Failed to add item to cart:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const incrementQuantity = async (id: number) => {
    try {
      setIsLoading(true)
      const item = cartItems.find(item => item.id === id)
      if (item) {
        await axiosConfig.put('/api/cart/update', {
          productId: id,
          productCount: item.quantity + 1
        })
        await fetchCart()
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
        await axiosConfig.put('/api/cart/update', {
          productId: id,
          productCount: item.quantity - 1
        })
        await fetchCart()
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
      await axiosConfig.delete('/api/cart/remove', {
        params: { productId: id }
      })
      await fetchCart()
    } catch (err) {
      console.error('Failed to remove item:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setIsLoading(true)
      await axiosConfig.delete('/api/cart/clear')
      setCartItems([])
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