"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  defaultValue: [number, number]
  max: number
  step: number
  onValueChange: (value: [number, number]) => void
  value?: [number, number]
  className?: string
}

export function Slider({ defaultValue, value, max, step, onValueChange, className }: SliderProps) {
  const [localValue, setLocalValue] = React.useState(value || defaultValue)

  React.useEffect(() => {
    if (value) {
      setLocalValue(value)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = [...localValue] as [number, number]
    newValue[index] = Number(e.target.value)
    setLocalValue(newValue)
    onValueChange(newValue)
  }

  return (
    <div className={cn("w-full flex gap-2", className)}>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={localValue[0]}
        onChange={(e) => handleChange(e, 0)}
        className="w-full"
      />
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={localValue[1]}
        onChange={(e) => handleChange(e, 1)}
        className="w-full"
      />
    </div>
  )
} 