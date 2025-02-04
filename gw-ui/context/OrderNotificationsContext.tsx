'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { OrderOutDto } from '@/types/order'
import axiosConfig from '@/config/axiosConfig'
import { formatOrderStatus } from '@/lib/utils'
import useAuth from '@/hooks/useAuth'

interface DismissedOrders {
  [key: number]: string // orderId: status
}

interface OrderNotificationsContextType {
  activeOrders: OrderOutDto[]
  dismissOrder: (orderId: number) => void
  clearAllNotifications: () => void
}

const OrderNotificationsContext = createContext<OrderNotificationsContextType>({
  activeOrders: [],
  dismissOrder: () => {},
  clearAllNotifications: () => {}
})

export function OrderNotificationsProvider({ children }: { children: React.ReactNode }) {
  const [activeOrders, setActiveOrders] = useState<OrderOutDto[]>([])
  const [dismissedOrders, setDismissedOrders] = useState<DismissedOrders>({})
  const { isLoggedIn } = useAuth()

  // Очищаем уведомления при выходе
  useEffect(() => {
    if (!isLoggedIn) {
      setActiveOrders([])
      setDismissedOrders({})
    }
  }, [isLoggedIn])

  useEffect(() => {
    const fetchActiveOrders = async () => {
      if (!isLoggedIn) return

      try {
        const response = await axiosConfig.get('/api/orders/active')
        const orders = response.data.filter((order: OrderOutDto) => 
          !['COMPLETED', 'REJECTED'].includes(order.status)
        )

        // Фильтруем заказы, показывая только те, у которых изменился статус
        const filteredOrders = orders.filter((order: OrderOutDto) => {
          const dismissedStatus = dismissedOrders[order.id]
          return !dismissedStatus || dismissedStatus !== order.status
        })

        setActiveOrders(filteredOrders)
      } catch (error) {
        console.error('Failed to fetch active orders:', error)
      }
    }

    if (isLoggedIn) {
      fetchActiveOrders()
      const interval = setInterval(fetchActiveOrders, 30000)
      return () => clearInterval(interval)
    }
  }, [isLoggedIn, dismissedOrders])

  const dismissOrder = (orderId: number) => {
    const order = activeOrders.find(o => o.id === orderId)
    if (order) {
      setDismissedOrders(prev => ({
        ...prev,
        [orderId]: order.status
      }))
      setActiveOrders(prev => prev.filter(o => o.id !== orderId))
    }
  }

  const clearAllNotifications = () => {
    const newDismissed: DismissedOrders = {}
    activeOrders.forEach(order => {
      newDismissed[order.id] = order.status
    })
    setDismissedOrders(newDismissed)
    setActiveOrders([])
  }

  return (
    <OrderNotificationsContext.Provider value={{ 
      activeOrders, 
      dismissOrder,
      clearAllNotifications 
    }}>
      {children}
    </OrderNotificationsContext.Provider>
  )
}

export const useOrderNotifications = () => useContext(OrderNotificationsContext) 