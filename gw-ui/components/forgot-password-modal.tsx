'use client'

import { useState, useRef, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import axiosConfig from '@/config/axiosConfig'
import { Progress } from "@/components/ui/progress"
import { useRouter } from 'next/navigation'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onPasswordReset: () => void
}

interface ApiError {
  response?: {
    status?: number
    data?: {
      message?: string
    }
  }
}

export function ForgotPasswordModal({ isOpen, onClose, onPasswordReset }: ForgotPasswordModalProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const setInputRef = useCallback((index: number) => (el: HTMLInputElement | null) => {
    inputs.current[index] = el
  }, [])

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[A-Z]/)) strength += 25
    if (password.match(/[0-9]/)) strength += 25
    if (password.match(/[^A-Za-z0-9]/)) strength += 25
    return strength
  }

  const handleEmailSubmit = async () => {
    try {
      // Сначала проверяем существование email
      const checkResponse = await axiosConfig.get(`/api/user/check-email?email=${email}`)
      
      if (!checkResponse.data) {
        toast({
          title: "Ошибка",
          description: "Пользователь с таким email не найден. Пожалуйста, зарегистрируйтесь",
          variant: "destructive",
        })
        onClose()
        router.push('/register')
        return
      }

      // Если email существует, показываем форму верификации
      setStep(2)
      
      // Затем отправляем код
      await axiosConfig.get(`/api/req/password?email=${email}`)
      toast({
        title: "Успех",
        description: "Код подтверждения отправлен на ваш email",
      })
    } catch (error: unknown) {
      const err = error as ApiError
      toast({
        title: "Ошибка",
        description: err.response?.data?.message || "Произошла ошибка",
        variant: "destructive",
      })
    }
  }

  const handleInput = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode]
      newCode[index] = value
      setVerificationCode(newCode)

      // Автоматически переходим к следующему полю
      if (value && index < 5) {
        inputs.current[index + 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    const numbers = pastedData.match(/\d/g) || []
    
    const newCode = [...verificationCode]
    numbers.forEach((num, index) => {
      if (index < 6) {
        newCode[index] = num
      }
    })
    setVerificationCode(newCode)

    // Устанавливаем фокус на следующее пустое поле
    const nextEmptyIndex = newCode.findIndex(digit => !digit)
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputs.current[nextEmptyIndex]?.focus()
    } else {
      inputs.current[5]?.focus() // Если все поля заполнены, фокус на последнее
    }
  }

  const handleVerificationSubmit = async () => {
    try {
      const code = verificationCode.join('')
      const response = await axiosConfig.get(`/api/edit/accepted?email=${email}&key=${code}`)
      if (response.status === 200) {
        setStep(3)
      }
    } catch (error: unknown) {
      const err = error as ApiError
      toast({
        title: "Ошибка",
        description: err.response?.data?.message || "Неверный код подтверждения",
        variant: "destructive",
      })
    }
  }

  const handlePasswordSubmit = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive",
      })
      return
    }

    if (passwordStrength < 75) {
      toast({
        title: "Ошибка",
        description: "Пароль слишком простой",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await axiosConfig.get(`/api/edit/password?password=${newPassword}`)

      if (response.status === 200) {
        toast({
          title: "Успех",
          description: "Пароль успешно изменен",
        })
        onPasswordReset() 
        onClose() 
      }
    } catch (error: unknown) {
      const err = error as ApiError
      if (err.response?.status !== 200) {
        toast({
          title: "Ошибка",
          description: err.response?.data?.message || "Не удалось изменить пароль",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Восстановление пароля"}
            {step === 2 && "Подтверждение email"}
            {step === 3 && "Новый пароль"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите ваш email"
              />
            </div>
            <Button onClick={handleEmailSubmit} className="w-full">
              Отправить код
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Мы отправили код подтверждения на адрес {email}
            </p>
            <div className="flex justify-center gap-2">
              {verificationCode.map((digit, index) => (
                <Input
                  key={index}
                  ref={setInputRef(index)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInput(index, e.target.value)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center"
                />
              ))}
            </div>
            <Button onClick={handleVerificationSubmit} className="w-full">
              Подтвердить
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label>Новый пароль</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  setPasswordStrength(checkPasswordStrength(e.target.value))
                }}
                placeholder="Введите новый пароль"
              />
              <Progress value={passwordStrength} className="mt-2" />
            </div>
            <div>
              <Label>Подтвердите пароль</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите пароль"
              />
            </div>
            <Button onClick={handlePasswordSubmit} className="w-full">
              Сохранить пароль
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 