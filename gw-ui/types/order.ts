import { UserOutDto } from './user'
import { LocationDto } from './location'
export interface OrderOutDto {
  id: number
  user: UserOutDto
  address: LocationDto
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