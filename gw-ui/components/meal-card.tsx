import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import useAuth from '@/hooks/useAuth'


interface Meal {
  id: number
  name: string
  description: string
  price: number
  calories: number
  category: string
  img: string
  energyVal: number
}

interface MealCardProps {
  meal: Meal
  onSelect: () => void
}

export default function MealCard({ meal, onSelect }: MealCardProps) {
  const router = useRouter()
  const { isLoading, addToCart, isItemInCart } = useCart()
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
          energyVal: meal.energyVal
        },
        countProducts: 1
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
      if (!isLoggedIn) {
        router.push('/login')
      }
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{meal.name}</CardTitle>
        <CardDescription>{meal.description}</CardDescription>
      </CardHeader>
      <CardContent className="relative h-64 px-4">
        <div className="relative h-full w-[95%] mx-auto">
          <Image
            src={meal.img}
            alt={meal.name}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-lg font-semibold">{meal.price} ₽</span>
        <div className="flex gap-2">
          <Button onClick={onSelect} variant="outline">
            Подробнее
          </Button>
          <Button 
            onClick={handleAddToCart}
            disabled={isLoading || isInCart}
          >
            {isInCart ? 'В корзине' : isLoading ? 'Добавление...' : 'В корзину'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

