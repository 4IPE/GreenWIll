import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { OrderOutDto } from "@/types/order"
import { formatCurrency, formatOrderStatus } from "@/lib/utils"

interface OrderReceiptModalProps {
  order: OrderOutDto | null
  isOpen: boolean
  onClose: () => void
}

export function OrderReceiptModal({ order, isOpen, onClose }: OrderReceiptModalProps) {
  if (!order) return null

  const total = order.cart.cartItem.reduce((sum: number, item) => 
    sum + item.product.price * item.countProducts, 0)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Заказ #{order.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="text-sm text-muted-foreground">Статус: {formatOrderStatus(order.status)}</p>
          </div>
          <div className="space-y-2">
            {order.cart.cartItem.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center py-2 border-b">
                <div className="flex-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(item.product.price)} × {item.countProducts}
                  </p>
                </div>
                <p className="font-medium">
                  {formatCurrency(item.product.price * item.countProducts)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-2 font-bold">
            <p>Итого:</p>
            <p>{formatCurrency(total)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 