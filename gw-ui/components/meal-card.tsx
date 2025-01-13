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
  image: string
}

interface MealCardProps {
  meal: Meal
  onSelect: () => void
}

export default function MealCard({ meal, onSelect }: MealCardProps) {
  const router = useRouter()
  const { isLoading, addToCart } = useCart()
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
      <CardContent>
        <Image
          src={meal.image}
          alt={meal.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-md"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-lg font-semibold">{meal.price} ₽</span>
        <div className="flex gap-2">
          <Button onClick={onSelect} variant="outline">
            Подробнее
          </Button>
          <Button 
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? 'Добавление...' : 'В корзину'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

