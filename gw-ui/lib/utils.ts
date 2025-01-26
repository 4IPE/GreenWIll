import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(amount)
}

export function formatOrderStatus(status: string): string {
  const statusMap: { [key: string]: string } = {
    WAITING: 'Ожидает подтверждения',
    ACTIVITY: 'Готовится',
    GOES: 'Принят в доставку',
    RUN: 'Доставляется',
    COMPLETED: 'Доставлен',
    REJECTED: 'Отменён'
  }
  return statusMap[status] || status
}
