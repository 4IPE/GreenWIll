"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  defaultValue: [number, number]
  max: number
  step: number
  onValueChange: (value: [number, number]) => void
  className?: string
}

export function Slider({ defaultValue, max, step, onValueChange, className }: SliderProps) {
  const [value, setValue] = React.useState(defaultValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = [...value] as [number, number]
    newValue[index] = Number(e.target.value)
    setValue(newValue)
    onValueChange(newValue)
  }

  return (
    <div className={cn("w-full flex gap-2", className)}>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => handleChange(e, 0)}
        className="w-full"
      />
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => handleChange(e, 1)}
        className="w-full"
      />
    </div>
  )
} 