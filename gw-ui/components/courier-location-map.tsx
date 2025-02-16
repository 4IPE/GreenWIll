'use client'

import { OrderOutDto } from '@/types/order'
import { useMemo } from 'react'
import { Button } from './ui/button'
import { MapPin } from 'lucide-react'
import { Card } from './ui/card'

interface CourierLocationMapProps {
  courierLocation: { latitude: number; longitude: number } | null;
  orders: OrderOutDto[];
  onOrderSelect?: (order: OrderOutDto) => void;
  onUpdateLocation: () => void;
  isLoadingLocation: boolean;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function getYandexMapsUrl(address: string): string {
  return `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;
}

export function CourierLocationMap({ 
  courierLocation, 
  orders, 
  onOrderSelect,
  onUpdateLocation,
  isLoadingLocation 
}: CourierLocationMapProps) {
  // Сортируем заказы по расстоянию от курьера
  const sortedOrders = useMemo(() => {
    if (!courierLocation) return orders;

    return [...orders].sort((a, b) => {
      if (!a.address?.latitude || !a.address?.longitude || 
          !b.address?.latitude || !b.address?.longitude) return 0;

      const distA = calculateDistance(
        courierLocation.latitude,
        courierLocation.longitude,
        a.address.latitude,
        a.address.longitude
      );

      const distB = calculateDistance(
        courierLocation.latitude,
        courierLocation.longitude,
        b.address.latitude,
        b.address.longitude
      );

      return distA - distB;
    });
  }, [orders, courierLocation]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Доступные заказы</h2>
        <Button 
          onClick={onUpdateLocation}
          disabled={isLoadingLocation}
          variant="outline"
          className="w-full sm:w-auto"
        >
          <MapPin className="mr-2 h-4 w-4" />
          {isLoadingLocation ? "Обновление..." : "Обновить местоположение"}
        </Button>
      </div>

      <div className="space-y-4">
        {sortedOrders.map((order) => {
          if (!order.address) return null;

          const distance = courierLocation && order.address.latitude && order.address.longitude ?
            calculateDistance(
              courierLocation.latitude,
              courierLocation.longitude,
              order.address.latitude,
              order.address.longitude
            ).toFixed(1) : null;

          const addressStr = [
            order.address.city,
            order.address.street,
            `дом ${order.address.house}`,
            order.address.apartment ? `квартира ${order.address.apartment}` : null,
          ].filter(Boolean).join(', ');

          const yandexMapsUrl = getYandexMapsUrl(addressStr);

          return (
            <Card key={order.id} className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <a 
                    href={yandexMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-words"
                  >
                    {addressStr}
                  </a>
                  {distance && (
                    <p className="text-sm text-muted-foreground">
                      Расстояние: {distance} км
                    </p>
                  )}
                </div>
                <Button 
                  onClick={() => onOrderSelect?.(order)}
                  className="w-full sm:w-auto"
                >
                  Взять заказ
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}