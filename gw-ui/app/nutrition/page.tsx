'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MealCard from '@/components/meal-card'
import MealModal from '@/components/meal-modal'
import { motion } from 'framer-motion'
import axiosConfig from '@/config/axiosConfig'

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

interface MealPlan {
  breakfast: Meal[]
  lunch: Meal[]
  dinner: Meal[]
}

export default function NutritionPlan() {
  const [isLoading, setIsLoading] = useState(false)
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(() => {
    if (typeof window === 'undefined') return null;
    
    const saved = localStorage.getItem('mealPlan');
    if (!saved) return null;
    
    const { plan, timestamp } = JSON.parse(saved);
    // Проверяем, не истекли ли 2 часа
    if (Date.now() - timestamp > 2 * 60 * 60 * 1000) {
      localStorage.removeItem('mealPlan');
      return null;
    }
    
    return plan;
  })
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    goal: '',
    activityLevel: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await axiosConfig.post('/api/nutrition/plan', {
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        gender: formData.gender,
        goal: formData.goal,
        activityLevel: formData.activityLevel
      })
      const newPlan = response.data;
      setMealPlan(newPlan)
      // Сохраняем план и время сохранения
      localStorage.setItem('mealPlan', JSON.stringify({
        plan: newPlan,
        timestamp: Date.now()
      }))
    } catch (error) {
      console.error('Error fetching meal plan:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Персональный план питания</h1>
      
      {!mealPlan ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Введите ваши данные</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="age">Возраст</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({...prev, age: e.target.value}))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="weight">Вес (кг)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({...prev, weight: e.target.value}))}
                  required
                />
              </div>

              <div>
                <Label htmlFor="height">Рост (см)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({...prev, height: e.target.value}))}
                  required
                />
              </div>

              <div>
                <Label>Пол</Label>
                <Select onValueChange={(value) => setFormData(prev => ({...prev, gender: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите пол" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Мужской</SelectItem>
                    <SelectItem value="FEMALE">Женский</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Цель</Label>
                <Select onValueChange={(value) => setFormData(prev => ({...prev, goal: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите цель" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOSE_WEIGHT">Похудение</SelectItem>
                    <SelectItem value="MAINTAIN">Поддержание веса</SelectItem>
                    <SelectItem value="GAIN_WEIGHT">Набор массы</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Уровень активности</Label>
                <Select onValueChange={(value) => setFormData(prev => ({...prev, activityLevel: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите уровень активности" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Низкий</SelectItem>
                    <SelectItem value="MEDIUM">Средний</SelectItem>
                    <SelectItem value="HIGH">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Составляем план..." : "Получить план питания"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {['breakfast', 'lunch', 'dinner'].map((mealTime) => (
            <div key={mealTime}>
              <h2 className="text-2xl font-semibold mb-4 capitalize">
                {mealTime === 'breakfast' ? 'Завтрак' : 
                 mealTime === 'lunch' ? 'Обед' : 'Ужин'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mealPlan[mealTime as keyof MealPlan].map((meal, mealIndex) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: mealIndex * 0.1 }}
                  >
                    <MealCard meal={meal} onSelect={() => setSelectedMeal(meal)} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          
          <Button 
            onClick={() => {
              setMealPlan(null)
              localStorage.removeItem('mealPlan')
            }} 
            variant="outline" 
            className="mt-8"
          >
            Составить новый план
          </Button>
        </div>
      )}

      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  )
} 