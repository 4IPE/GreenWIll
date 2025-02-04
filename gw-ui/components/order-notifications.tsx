'use client'

import { useOrderNotifications } from '@/context/OrderNotificationsContext'
import { formatOrderStatus } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from './ui/button'

export function OrderNotifications() {
  const { activeOrders, dismissOrder, clearAllNotifications } = useOrderNotifications()

  if (activeOrders.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm w-full">
      {activeOrders.length > 1 && (
        <div className="flex justify-end mb-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllNotifications}
            className="text-sm"
          >
            Закрыть все
          </Button>
        </div>
      )}
      <AnimatePresence>
        {activeOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-card rounded-lg shadow-lg p-4 border relative"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => dismissOrder(order.id)}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="pr-6">
              <h3 className="font-semibold">Заказ #{order.id}</h3>
              <p className="text-sm text-muted-foreground">
                Статус: {formatOrderStatus(order.status)}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
} 