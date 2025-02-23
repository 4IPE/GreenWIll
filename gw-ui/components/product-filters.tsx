import { useState } from 'react'
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
  sortBy: string
  categories: string[]
  lowCalories: boolean
  lowPrice: boolean
  highProtein: boolean
  highFat: boolean
  highCarbs: boolean
}

export function ProductFilters({ onFilterChange, categories }: FilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>('')
  const [lowCalories, setLowCalories] = useState<boolean>(false)
  const [lowPrice, setLowPrice] = useState<boolean>(false)
  const [highProtein, setHighProtein] = useState<boolean>(false)
  const [highFat, setHighFat] = useState<boolean>(false)
  const [highCarbs, setHighCarbs] = useState<boolean>(false)

  const handleFilterChange = (newFilters: Partial<FilterValues>) => {
    if (newFilters.categories !== undefined) setSelectedCategories(newFilters.categories);
    if (newFilters.sortBy !== undefined) setSortBy(newFilters.sortBy);
    if (newFilters.lowCalories !== undefined) setLowCalories(newFilters.lowCalories);
    if (newFilters.lowPrice !== undefined) setLowPrice(newFilters.lowPrice);
    if (newFilters.highProtein !== undefined) setHighProtein(newFilters.highProtein);
    if (newFilters.highFat !== undefined) setHighFat(newFilters.highFat);
    if (newFilters.highCarbs !== undefined) setHighCarbs(newFilters.highCarbs);

    onFilterChange({
      categories: newFilters.categories ?? selectedCategories,
      sortBy: newFilters.sortBy ?? sortBy,
      lowCalories: newFilters.lowCalories ?? lowCalories,
      lowPrice: newFilters.lowPrice ?? lowPrice,
      highProtein: newFilters.highProtein ?? highProtein,
      highFat: newFilters.highFat ?? highFat,
      highCarbs: newFilters.highCarbs ?? highCarbs
    });
  };

  const handleReset = () => {
    setSelectedCategories([])
    setSortBy('')
    setLowCalories(false)
    setLowPrice(false)
    setHighProtein(false)
    setHighFat(false)
    setHighCarbs(false)
    
    onFilterChange({
      categories: [],
      sortBy: '',
      lowCalories: false,
      lowPrice: false,
      highProtein: false,
      highFat: false,
      highCarbs: false
    })
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
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => {
                  const newCategories = checked
                    ? [...selectedCategories, category]
                    : selectedCategories.filter(c => c !== category)
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
          defaultValue={sortBy}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите сортировку" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Цена (по возрастанию)</SelectItem>
            <SelectItem value="price-desc">Цена (по убыванию)</SelectItem>
            <SelectItem value="calories-asc">Калории (по возрастанию)</SelectItem>
            <SelectItem value="calories-desc">Калории (по убыванию)</SelectItem>
            <SelectItem value="protein-desc">Больше белка</SelectItem>
            <SelectItem value="fat-desc">Больше жиров</SelectItem>
            <SelectItem value="carbs-desc">Больше углеводов</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Быстрые фильтры</h3>
        
        <div className="flex items-center space-x-2">
          <Switch
            checked={lowCalories}
            onCheckedChange={(checked) => handleFilterChange({ lowCalories: checked })}
          />
          <Label>Низкокалорийные блюда</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={lowPrice}
            onCheckedChange={(checked) => handleFilterChange({ lowPrice: checked })}
          />
          <Label>Экономичные блюда</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={highProtein}
            onCheckedChange={(checked) => handleFilterChange({ highProtein: checked })}
          />
          <Label>Высокое содержание белка</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={highFat}
            onCheckedChange={(checked) => handleFilterChange({ highFat: checked })}
          />
          <Label>Высокое содержание жиров</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={highCarbs}
            onCheckedChange={(checked) => handleFilterChange({ highCarbs: checked })}
          />
          <Label>Высокое содержание углеводов</Label>
        </div>
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        Сбросить фильтры
      </Button>
    </div>
  )
} 