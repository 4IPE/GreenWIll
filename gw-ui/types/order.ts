export interface OrderOutDto {
  id: number
  user: {
    username: string
    role: { role: string }
  }
  cart: {
    id: number
    cartItem: Array<{
      product: {
        id: number
        name: string
        price: number
      }
      countProducts: number
    }>
  }
  status: string
} 