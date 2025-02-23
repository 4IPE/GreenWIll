"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import Image from "next/image"
import { useToast } from "./use-toast"

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  onChange: (url: string) => void
  value?: string
  preview?: boolean
}

export function FileInput({ className, onChange, value, preview = true, ...props }: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(value || null)
  const [isUploading, setIsUploading] = React.useState(false)
  const { toast } = useToast()

  const uploadToImgbb = async (file: File) => {
    const formData = new FormData()
    
    // Конвертируем файл в base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    
    // Убираем префикс data:image/xxx;base64,
    const base64Image = base64.split(',')[1]
    
    formData.append('image', base64Image)
    formData.append('name', file.name)

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY!}`, {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Используем display_url для лучшего качества изображения
        return data.data.display_url
      } else {
        throw new Error(data.error?.message || 'Ошибка загрузки изображения')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      try {

        if (preview) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setPreviewUrl(reader.result as string)
          }
          reader.readAsDataURL(file)
        }


        const imageUrl = await uploadToImgbb(file)
        onChange(imageUrl)
        
        toast({
          title: "Успешно",
          description: "Изображение загружено",
        })
      } catch {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить изображение",
          variant: "destructive",
        })
        setPreviewUrl(null)
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? "Загрузка..." : "Выбрать файл"}
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