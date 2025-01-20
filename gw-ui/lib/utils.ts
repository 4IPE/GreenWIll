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

export const formatOrderStatus = (status: string) => {
  switch (status) {
    case 'ACTIVITY':
      return 'Готовится'
    case 'WAITING':
      return 'В ожидании'
    case 'FINISH':
      return 'Готов'
    default:
      return status
  }
}
