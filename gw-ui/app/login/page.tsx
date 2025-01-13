'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import axiosConfig from '@/config/axiosConfig'

const LANDSCAPE_IMAGE_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL·E 2024-12-31 17.23.08 - A breathtaking 4K landscape featuring a dense green forest with tall trees, majestic mountains in the background, a clear blue sky, and a serene river-0yLCMiSFg7mfT9tZNMMDDVfxPv3Skn.png";

interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
}

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState(LANDSCAPE_IMAGE_URL)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const preloadImage = async () => {
      try {
        const response = await fetch(LANDSCAPE_IMAGE_URL);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setImageSrc(objectUrl);
      } catch (error) {
        console.error('Failed to preload image:', error);
      }
    };

    preloadImage();

    return () => {
      if (imageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await axiosConfig.post('/api/login', {
        username,
        password,
      })
      console.log('Login successful:', response.data)
      if (typeof window !== 'undefined') {
        router.push('/')
      }
    } catch (err: unknown) {
      const error = err as ApiError
      setError(error.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Левая секция с изображением */}
      <div className="relative w-full md:w-1/2 h-48 md:h-screen overflow-hidden bg-black">
        <Image
          src={imageSrc}
          alt="Природный пейзаж"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">GreenWill</h1>
            <p className="text-xl text-white/90">Здоровая еда для здоровой жизни</p>
          </motion.div>
        </div>
      </div>

      {/* Правая секция с формой */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <CardTitle>Вход в аккаунт</CardTitle>
              <CardDescription>
                Войдите в свой аккаунт для доступа к заказам
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Вход..." : "Войти"}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                <p className="text-muted-foreground">
                  Нет аккаунта?{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    Зарегистрироваться
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

