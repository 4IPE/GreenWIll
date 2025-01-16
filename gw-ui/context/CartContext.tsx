'use client'

import React, { createContext, useState, useContext, useEffect } from "react"
import axiosConfig from '@/config/axiosConfig'
import useAuth from '@/hooks/useAuth'

// Интерфейсы, соответствующие DTO
interface ProductDto {
  id: number
  name: string
  description: string
  price: number
  calories: number
  category: string
  img: string
}

interface CartItemDto {
  product: ProductDto
  countProducts: number
}

interface CartContextType {
  cartItems: CartItemDto[]
  addToCart: (item: CartItemDto) => Promise<void>
  incrementQuantity: (id: number) => Promise<void>
  decrementQuantity: (id: number) => Promise<void>
  removeItem: (id: number) => Promise<void>
  clearCart: () => Promise<void>
  isLoading: boolean
  fetchCart: () => Promise<void>
  isItemInCart: (id: number) => boolean
  loadingItems: Set<number>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingItems, setLoadingItems] = useState<Set<number>>(new Set())
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
      const cartData = response.data.cartItem.map((item: CartItemDto) => ({
        product: item.product,
        countProducts: item.countProducts
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

  const addToCart = async (item: CartItemDto) => {
    try {
      setIsLoading(true)
      // Оптимистично добавляем товар
      setCartItems(prev => [...prev, item])
      
      await axiosConfig.post('/api/cart/add', {
        product: {
          id: item.product.id,
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          calories: item.product.calories,
          category: item.product.category,
          img: item.product.img
        },
        countProducts: item.countProducts
      })
    } catch (err) {
      // В случае ошибки откатываем изменения
      setCartItems(prev => prev.filter(i => i.product.id !== item.product.id))
      console.error('Failed to add item to cart:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const addLoadingItem = (id: number) => {
    setLoadingItems(prev => new Set(prev).add(id))
  }

  const removeLoadingItem = (id: number) => {
    setLoadingItems(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const incrementQuantity = async (id: number) => {
    try {
      addLoadingItem(id)
      setCartItems(prev => prev.map(item => 
        item.product.id === id 
          ? { ...item, countProducts: item.countProducts + 1 }
          : item
      ))

      const item = cartItems.find((item: CartItemDto) => item.product.id === id)
      if (item) {
        await axiosConfig.put('/api/cart/update', null, {
          params: {
            productId: id,
            quantity: item.countProducts + 1
          }
        })
      }
    } catch (err) {
      await fetchCart()
      console.error('Failed to increment quantity:', err)
    } finally {
      removeLoadingItem(id)
    }
  }

  const decrementQuantity = async (id: number) => {
    try {
      addLoadingItem(id)
      const item = cartItems.find((item: CartItemDto) => item.product.id === id)
      if (item) {
        if (item.countProducts <= 1) {
          // Если количество 1 или меньше - удаляем товар
          setCartItems(prev => prev.filter(i => i.product.id !== id))
          await axiosConfig.delete('/api/cart/remove', {
            params: { productId: id }
          })
        } else {
          // Иначе уменьшаем количество
          setCartItems(prev => prev.map(item => 
            item.product.id === id 
              ? { ...item, countProducts: item.countProducts - 1 }
              : item
          ))
          await axiosConfig.put('/api/cart/update', null, {
            params: {
              productId: id,
              quantity: item.countProducts - 1
            }
          })
        }
      }
    } catch (err) {
      await fetchCart()
      console.error('Failed to decrement quantity:', err)
    } finally {
      removeLoadingItem(id)
    }
  }

  const removeItem = async (id: number) => {
    try {
      setIsLoading(true)
      // Оптимистично удаляем товар
      setCartItems(prev => prev.filter(item => item.product.id !== id))

      await axiosConfig.delete('/api/cart/remove', {
        params: { productId: id }
      })
    } catch (err) {
      // В случае ошибки восстанавливаем состояние
      await fetchCart()
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

  const total = cartItems.reduce((sum: number, item: CartItemDto) => sum + item.product.price * item.countProducts, 0)

  const isItemInCart = (id: number): boolean => {
    return cartItems.some(item => item.product.id === id)
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
        isLoading,
        fetchCart,
        isItemInCart,
        loadingItems
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