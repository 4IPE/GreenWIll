'use client'

import { formatCurrency, formatOrderStatus } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { OrderOutDto } from '@/types/order'
import { LocationDto } from '@/types/location'
import { Copy, MapPin } from 'lucide-react'
import { toast } from './ui/use-toast'
import { Button } from './ui/button'

interface OrderDetailsProps {
  order: OrderOutDto;
  showDeliveryInfo?: boolean;
  showCookingInfo?: boolean;
}

function getYandexMapsUrl(address: LocationDto | null): string {
  if (!address) return '';
  
  // Формируем полный адрес для поиска
  const fullAddress = [
    address.city,
    address.street,
    `дом ${address.house}`,
    address.apartment ? `квартира ${address.apartment}` : null,
  ].filter(Boolean).join(', ');
  
  return `https://yandex.ru/maps/?text=${encodeURIComponent(fullAddress)}`;
}

function formatAddress(address: LocationDto | null): string {
  if (!address) return 'Адрес не указан';
  
  const parts = [
    address.city,
    address.street,
    `д. ${address.house}`,
    address.apartment ? `кв. ${address.apartment}` : null,
    address.floor ? `этаж ${address.floor}` : null,
    address.entrance ? `подъезд ${address.entrance}` : null
  ].filter(Boolean);
  
  return parts.join(', ');
}

export function OrderDetails({ order, showDeliveryInfo, showCookingInfo }: OrderDetailsProps) {
  const handleCopyAddress = () => {
    const address = formatAddress(order.address);
    navigator.clipboard.writeText(address);
    toast({
      description: "Адрес скопирован в буфер обмена",
    });
  };

  const yandexMapsUrl = getYandexMapsUrl(order.address);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Заказ #{order.id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Основная информация */}
        <div className="space-y-2">
          <p><strong>Номер заказа:</strong> #{order.id}</p>
          <p><strong>Статус:</strong> {formatOrderStatus(order.status)}</p>
          <p><strong>Клиент:</strong> {order.user.firstName} {order.user.lastName}</p>
        </div>

        {/* Информация о доставке */}
        {showDeliveryInfo && (
          <div className="space-y-2 border-t pt-4">
            <h3 className="font-semibold">Информация о доставке:</h3>
            <div className="flex items-center gap-2">
              <strong>Адрес:</strong>
              <a 
                href={yandexMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-2"
              >
                {formatAddress(order.address)}
                <MapPin className="h-4 w-4" />
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyAddress}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p><strong>Телефон:</strong> {order.user.phone}</p>
          </div>
        )}

        {/* Состав заказа */}
        <div className="space-y-2 border-t pt-4">
          <h3 className="font-semibold">Состав заказа:</h3>
          <div className="space-y-2">
            {order.cart.cartItem.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.product.name}</span>
                  <span className="text-sm text-muted-foreground"> x{item.countProducts}</span>
                </div>
                <span>{formatCurrency(item.product.price * item.countProducts)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Информация для повара */}
        {showCookingInfo && (
          <div className="space-y-2 border-t pt-4">
            <h3 className="font-semibold">Информация для приготовления:</h3>
            <p>Статус: {formatOrderStatus(order.status)}</p>
            {order.status === 'ACTIVITY' && (
              <p className="text-yellow-600">Заказ в процессе приготовления</p>
            )}
            {order.status === 'GOES' && (
              <p className="text-green-600">Заказ готов к доставке</p>
            )}
            {order.cart.cartItem.map((item) => (
              <div key={item.product.id} className="space-y-1">
                <p><strong>{item.product.name}</strong> - {item.countProducts} шт.</p>
                <p className="text-sm text-muted-foreground">{item.product.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Итоговая сумма */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center font-semibold">
            <span>Итого:</span>
            <span>{formatCurrency(order.cart.cartItem.reduce((sum, item) => 
              sum + item.product.price * item.countProducts, 0
            ))}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 