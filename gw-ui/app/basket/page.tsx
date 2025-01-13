'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'
import { useCart } from '@/context/CartContext'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default function Basket() {
  const { isLoggedIn, isLoading: authLoading } = useAuth()
  const { cartItems, incrementQuantity, decrementQuantity, removeItem, isLoading } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !isLoggedIn && typeof window !== 'undefined') {
      router.push('/login')
      return
    }
  }, [authLoading, isLoggedIn, router])

  if (authLoading) {
    return <div>Loading...</div>
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleIncrement = async (id: number) => {
    await incrementQuantity(id)
  }

  const handleDecrement = async (id: number) => {
    await decrementQuantity(id)
  }

  const handleRemove = async (id: number) => {
    await removeItem(id)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Ваша Корзина</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Содержимое Заказа</CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 p-4 border rounded"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.price} ₽</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      onClick={() => handleDecrement(item.id)}
                      disabled={isLoading}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      onClick={() => handleIncrement(item.id)}
                      disabled={isLoading}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      onClick={() => handleRemove(item.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center py-4">Ваша корзина пуста</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-xl font-semibold">Итого:</div>
            <div className="text-xl font-semibold">{total} ₽</div>
          </CardFooter>
        </Card>

        {cartItems.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" onClick={() => router.push('/menu')}>
              Продолжить покупки
            </Button>
            <Button className="flex-1">Оформить Заказ</Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

