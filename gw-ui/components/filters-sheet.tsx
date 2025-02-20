"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { FilterIcon, X } from "lucide-react"
import { ProductFilters } from "./product-filters"
import { FilterValues } from "./product-filters"
import { cn } from "@/lib/utils"

interface FiltersSheetProps {
  onFilterChange: (filters: FilterValues) => void
  categories: string[]
}

export function FiltersSheet({ onFilterChange, categories }: FiltersSheetProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpen(true)}
      >
        <FilterIcon className="mr-2 h-4 w-4" />
        Фильтры
      </Button>
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full sm:w-[350px] bg-background shadow-xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold">Фильтры</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="h-full overflow-y-auto pb-20">
          <ProductFilters 
            onFilterChange={onFilterChange} 
            categories={categories}
          />
        </div>
      </div>
      {/* Затемнение фона */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
} 