"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import Image from "next/image"

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  onChange: (path: string) => void
  value?: string
  preview?: boolean
}

export function FileInput({ className, onChange, value, preview = true, ...props }: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(value || null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Генерируем уникальное имя файла
      const fileName = `${Date.now()}_${file.name}`
      const path = `/images/products/${fileName}`
      
      // Копируем файл в public/images/products
      // В реальном приложении здесь должна быть загрузка на сервер
      // Для демонстрации просто сохраняем путь
      onChange(path)
      
      // Показываем превью
      if (preview) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
      >
        Выбрать файл
      </Button>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        {...props}
      />
      {previewUrl && (
        <div className="relative w-40 h-40">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
    </div>
  )
}