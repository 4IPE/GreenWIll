import { useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface FilterProps {
  onFilterChange: (filters: FilterValues) => void
  categories: string[]
}

export interface FilterValues {
  priceRange: [number, number]
  caloriesRange: [number, number]
  energyRange: [number, number]
  sortBy: string
  categories: string[]
  lowCalories: boolean
  lowPrice: boolean
  highEnergy: boolean
}

export function ProductFilters({ onFilterChange, categories }: FilterProps) {
  const [filters, setFilters] = useState<FilterValues>({
    priceRange: [0, 5000],
    caloriesRange: [0, 1000],
    energyRange: [0, 1000],
    sortBy: 'price-asc',
    categories: [],
    lowCalories: false,
    lowPrice: false,
    highEnergy: false
  })

  const handleFilterChange = (newFilters: Partial<FilterValues>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  return (
    <div className="space-y-6 p-4 border rounded-lg">
      <div>
        <h3 className="font-semibold mb-2">Категории</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  const newCategories = checked
                    ? [...filters.categories, category]
                    : filters.categories.filter(c => c !== category)
                  handleFilterChange({ categories: newCategories })
                }}
              />
              <label htmlFor={category} className="capitalize">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Сортировка</h3>
        <Select 
          onValueChange={(value) => handleFilterChange({ sortBy: value })}
          defaultValue={filters.sortBy}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите сортировку" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
            <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
            <SelectItem value="calories-asc">Калории: по возрастанию</SelectItem>
            <SelectItem value="calories-desc">Калории: по убыванию</SelectItem>
            <SelectItem value="energy-asc">КБЖУ: по возрастанию</SelectItem>
            <SelectItem value="energy-desc">КБЖУ: по убыванию</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Цена (₽)</h3>
        <Slider
          defaultValue={filters.priceRange}
          max={5000}
          step={100}
          onValueChange={(value) => handleFilterChange({ priceRange: value as [number, number] })}
        />
        <div className="text-sm text-muted-foreground mt-1">
          {filters.priceRange[0]}₽ - {filters.priceRange[1]}₽
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Калории</h3>
        <Slider
          defaultValue={filters.caloriesRange}
          max={1000}
          step={50}
          onValueChange={(value) => handleFilterChange({ caloriesRange: value as [number, number] })}
        />
        <div className="text-sm text-muted-foreground mt-1">
          {filters.caloriesRange[0]} - {filters.caloriesRange[1]} ккал
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">КБЖУ</h3>
        <Slider
          defaultValue={filters.energyRange}
          max={1000}
          step={50}
          onValueChange={(value) => handleFilterChange({ energyRange: value as [number, number] })}
        />
        <div className="text-sm text-muted-foreground mt-1">
          {filters.energyRange[0]} - {filters.energyRange[1]}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Быстрые фильтры</h3>
        
        <div className="flex items-center space-x-2">
          <Switch
            checked={filters.lowCalories}
            onCheckedChange={(checked) => handleFilterChange({ lowCalories: checked })}
          />
          <Label>Низкокалорийные блюда</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={filters.lowPrice}
            onCheckedChange={(checked) => handleFilterChange({ lowPrice: checked })}
          />
          <Label>Экономичные блюда</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={filters.highEnergy}
            onCheckedChange={(checked) => handleFilterChange({ highEnergy: checked })}
          />
          <Label>Высокое содержание КБЖУ</Label>
        </div>
      </div>

      <Button 
        className="w-full"
        onClick={() => {
          setFilters({
            priceRange: [0, 5000],
            caloriesRange: [0, 1000],
            energyRange: [0, 1000],
            sortBy: 'price-asc',
            categories: [],
            lowCalories: false,
            lowPrice: false,
            highEnergy: false
          })
          onFilterChange(filters)
        }}
      >
        Сбросить фильтры
      </Button>
    </div>
  )
} 