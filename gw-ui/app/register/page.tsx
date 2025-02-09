/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import axiosConfig from '@/config/axiosConfig'
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { VerificationCodeModal } from "@/components/verification-code-modal"

// Добавьте эту строку для отключения статической генерации
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

interface RegisterError {
  response?: {
    data?: {
      message?: string
    }
  }
}

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showVerification, setShowVerification] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[A-Z]/)) strength += 25
    if (password.match(/[0-9]/)) strength += 25
    if (password.match(/[^A-Za-z0-9]/)) strength += 25
    return strength
  }

  const checkUsername = async (username: string) => {
    try {
      const response = await axiosConfig.get(`/api/user/check?username=${username}`);
      if (response.data === true) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Такой логин уже занят"
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error('Ошибка при проверке username:', error);
      return false;
    }
  };

  const checkEmail = async (email: string) => {
    try {
      const response = await axiosConfig.get(`/api/user/check-email?email=${email}`);
      if (response.data === true) {
        // Если true - значит email существует
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Этот email уже используется"
        });
        return false;
      }
      return true;
    } catch (error) {
      console.error('Ошибка при проверке email:', error);
      return false;
    }
  };

  const validateForm = async () => {
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
    let isValid = true

    // Проверка логина
    if (formData.username.length < 5) {
      newErrors.username = 'Логин должен содержать минимум 5 символа'
      isValid = false
    } else {
      const isUsernameAvailable = await checkUsername(formData.username)
      if (!isUsernameAvailable) {
        isValid = false
      }
    }

    // Проверка email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email'
      isValid = false
    } else {
      const isEmailAvailable = await checkEmail(formData.email)
      if (!isEmailAvailable) {
        isValid = false
      }
    }

    // Проверка пароля
    if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов'
      isValid = false
    }

    // Проверка подтверждения пароля
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (await validateForm()) {
      try {
        // Изменяем способ отправки параметров
        await axiosConfig.post(`/api/create?username=${formData.username}&email=${formData.email}`)
        
        setShowVerification(true)
      } catch (err) {
        const error = err as RegisterError
        toast({
          title: "Ошибка",
          description: error.response?.data?.message || "Произошла ошибка при регистрации",
          variant: "destructive",
        })
      }
    }
  }

  const handleVerificationSubmit = async (code: string) => {
    try {
      const checkResponse = await axiosConfig.post(`/api/check?username=${formData.username}&key=${code}`)

      if (checkResponse.status === 200) {
        await axiosConfig.post('/api/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
        
        // Сначала выполняем вход
        await axiosConfig.post('/api/login', {
          username: formData.username,
          password: formData.password,
        })
        
        toast({
          title: "Успех",
          description: "Регистрация успешно завершена",
        })
        
        router.push('/') // Редирект на главную
      }
    } catch (err) {
      const error = err as RegisterError
      toast({
        title: "Ошибка",
        description: error.response?.data?.message || "Неверный код подтверждения",
        variant: "destructive",
      })
    }
  }

  const handleResendCode = async () => {
    try {
      // Здесь тоже изменяем способ отправки параметров
      await axiosConfig.post(`/api/create?username=${formData.username}&email=${formData.email}`)
      
      toast({
        title: "Успех",
        description: "Новый код отправлен на ваш email",
      })
    } catch (err) {
      const error = err as RegisterError
      toast({
        title: "Ошибка",
        description: error.response?.data?.message || "Не удалось отправить новый код",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Обновляем только индикатор сложности пароля
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value))
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Левая секция с изображением */}
        <div className="relative w-full md:w-1/2 h-48 md:h-screen overflow-hidden bg-black">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL·E 2024-12-31 17.23.08 - A breathtaking 4K landscape featuring a dense green forest with tall trees, majestic mountains in the background, a clear blue sky, and a serene river-0yLCMiSFg7mfT9tZNMMDDVfxPv3Skn.png"
            alt="Природный пейзаж"
            fill
            className="object-cover opacity-80"
            priority
            loading="eager"
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
                <CardTitle>Регистрация</CardTitle>
                <CardDescription>
                  Создайте аккаунт для заказа здоровой еды
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Логин"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    {errors.username && (
                      <p className="text-sm text-destructive mt-1">{errors.username}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Пароль"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <Progress value={passwordStrength} className="mt-2" />
                    <p className="text-sm text-muted-foreground mt-1">
                      {passwordStrength === 0 && 'Очень слабый'}
                      {passwordStrength === 25 && 'Слабый'}
                      {passwordStrength === 50 && 'Средний'}
                      {passwordStrength === 75 && 'Хороший'}
                      {passwordStrength === 100 && 'Сильный'}
                    </p>
                    {errors.password && (
                      <p className="text-sm text-destructive mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="Подтвердите пароль"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    Зарегистрироваться
                  </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                  <p className="text-muted-foreground">
                    Уже есть аккаунт?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Войти
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <VerificationCodeModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onSubmit={handleVerificationSubmit}
        onResend={handleResendCode}
        email={formData.email}
      />
    </>
  )
}

