'use client'

import { useState, useEffect } from 'react'
import MealCard from '@/components/meal-card'
import MealModal from '@/components/meal-modal'
import { motion } from 'framer-motion'
import axiosConfig from '@/config/axiosConfig'

// Определяем интерфейс для элемента меню
interface Meal {
  id: number
  name: string
  price: number
  image: string
  description: string
  calories: number
  category: string
}

interface ApiMeal {
  id: number
  name: string
  price: number
  image: string
  description: string
  calories: number
  category?: string  // опциональное поле, так как может отсутствовать в ответе
}

export default function Menu() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axiosConfig.get('/api/products/all')
        const mealsWithCategory = response.data.map((meal: ApiMeal) => ({
          ...meal,
          category: meal.category || ''
        }))
        setMeals(mealsWithCategory)
      } catch (err) {
        setError('Failed to load meals. Please try again later.')
        console.error('Failed to fetch meals:', err)
      }
    }

    fetchMeals()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Наше Меню</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal, index) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <MealCard meal={meal} onSelect={() => setSelectedMeal(meal)} />
          </motion.div>
        ))}
      </div>
      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  )
}

