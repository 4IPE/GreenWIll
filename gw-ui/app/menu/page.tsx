'use client'

import { useState, useEffect } from 'react'
import { ProductFilters, FilterValues } from '@/components/product-filters'
import MealCard from '@/components/meal-card'
import MealModal from '@/components/meal-modal'
import { motion } from 'framer-motion'
import axiosConfig from '@/config/axiosConfig'
import { FiltersSheet } from "@/components/filters-sheet"

interface Meal {
  id: number
  name: string
  price: number
  img: string
  description: string
  calories: number
  category: string
  proteins: number
  carbohydrates: number
  fats: number
}

export default function Menu() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mealsResponse, categoriesResponse] = await Promise.all([
          axiosConfig.get('/api/products/all'),
          axiosConfig.get('/api/products/categories')
        ])

        const mealsWithCategory = mealsResponse.data.map((meal: Meal) => ({
          ...meal,
          category: meal.category?.toLowerCase() || ''
        }))
        
        const normalizedCategories = categoriesResponse.data.map((category: string) => 
          category.toLowerCase()
        )
        
        setMeals(mealsWithCategory)
        setFilteredMeals(mealsWithCategory)
        setCategories(normalizedCategories)
      } catch (err) {
        setError('Failed to load data. Please try again later.')
        console.error('Failed to fetch data:', err)
      }
    }

    fetchData()
  }, [])

  const handleFilterChange = (filters: FilterValues) => {
    let filtered = [...meals]

    // Применяем фильтр категорий
    if (filters.categories.length > 0) {
      filtered = filtered.filter(meal => 
        filters.categories.some(category => 
          meal.category.toLowerCase() === category.toLowerCase()
        )
      )
    }

    // Применяем быстрые фильтры
    if (filters.lowCalories) {
      filtered = filtered.filter(meal => meal.calories < 300)
    }

    if (filters.lowPrice) {
      filtered = filtered.filter(meal => meal.price < 500)
    }

    if (filters.highProtein) {
      filtered = filtered.filter(meal => meal.proteins > 30)
    }

    if (filters.highFat) {
      filtered = filtered.filter(meal => meal.fats > 20)
    }

    if (filters.highCarbs) {
      filtered = filtered.filter(meal => meal.carbohydrates > 50)
    }

    // Применяем сортировку
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc': return a.price - b.price
          case 'price-desc': return b.price - a.price
          case 'calories-asc': return a.calories - b.calories
          case 'calories-desc': return b.calories - a.calories
          case 'protein-desc': return b.proteins - a.proteins
          case 'fat-desc': return b.fats - a.fats
          case 'carbs-desc': return b.carbohydrates - a.carbohydrates
          default: return 0
        }
      })
    }

    setFilteredMeals(filtered)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Наше Меню</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <div className="mb-4 flex items-center justify-between">
        <FiltersSheet 
          onFilterChange={handleFilterChange} 
          categories={categories}
          className="ml-4 md:ml-0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="hidden md:block">
          <ProductFilters 
            onFilterChange={handleFilterChange} 
            categories={categories}
          />
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal, index) => (
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
        </div>
      </div>

      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  )
}

