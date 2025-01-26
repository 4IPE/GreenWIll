import { UserOutDto } from './user'

export interface OrderOutDto {
  id: number
  user: UserOutDto
  cart: {
    id: number
    cartItem: Array<{
      product: {
        id: number
        name: string
        price: number
        description?: string
      }
      countProducts: number
    }>
  }
  status: string
} 