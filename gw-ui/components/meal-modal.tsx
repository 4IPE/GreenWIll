import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useCart } from '@/context/CartContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'

interface Meal {
  id: number
  name: string
  description: string
  price: number
  calories: number
  category: string
  img: string
  proteins: number
  carbohydrates: number
  fats: number
}

interface MealModalProps {
  meal: Meal
  onClose: () => void
}

export default function MealModal({ meal, onClose }: MealModalProps) {
  const { addToCart, isLoading, isItemInCart } = useCart()
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const isInCart = isItemInCart(meal.id)

  const handleAddToCart = async () => {
    try {
      if (!isLoggedIn) {
        router.push('/login')
        return
      }

      await addToCart({
        product: {
          id: meal.id,
          name: meal.name,
          description: meal.description,
          price: meal.price,
          calories: meal.calories,
          category: meal.category,
          img: meal.img,
          proteins: meal.proteins,
          carbohydrates: meal.carbohydrates,
          fats: meal.fats
        },
        countProducts: 1
      })
      onClose()
    } catch (error) {
      console.error('Error adding to cart:', error)
      if (!isLoggedIn) {
        router.push('/login')
      }
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{meal.name}</DialogTitle>
          <DialogDescription>{meal.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative h-64 w-[95%] mx-auto">
            <Image
              src={meal.img}
              alt={meal.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 425px) 100vw, 425px"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">{meal.price} ₽</span>
            <span className="text-muted-foreground">
              {meal.calories} калорий | Б:{meal.proteins} Ж:{meal.fats} У:{meal.carbohydrates}
            </span>
          </div>
        </div>
        <Button 
          onClick={handleAddToCart} 
          disabled={isLoading || isInCart}
          className="w-full"
        >
          {isInCart ? 'Товар в корзине' : isLoading ? 'Добавление...' : 'Добавить в корзину'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

