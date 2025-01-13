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
  image: string
  calories: number
}

interface MealModalProps {
  meal: Meal
  onClose: () => void
}

export default function MealModal({ meal, onClose }: MealModalProps) {
  const { addToCart, isLoading } = useCart()
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const handleAddToCart = async () => {
    try {
      if (!isLoggedIn) {
        router.push('/login')
        return
      }

      await addToCart({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        quantity: 1
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
          <Image
            src={meal.image}
            alt={meal.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">{meal.price} ₽</span>
            <span className="text-muted-foreground">{meal.calories} калорий</span>
          </div>
        </div>
        <Button 
          onClick={handleAddToCart} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Добавление...' : 'Добавить в корзину'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

