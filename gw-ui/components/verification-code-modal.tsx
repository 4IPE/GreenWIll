'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface VerificationCodeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (code: string) => void
  onResend: () => void
  email: string
}

export function VerificationCodeModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onResend,
  email 
}: VerificationCodeModalProps) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [canResend, setCanResend] = useState(false)
  const [timer, setTimer] = useState(120) // 2 минуты
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const setInputRef = useCallback((index: number) => (el: HTMLInputElement | null): void => {
    inputs.current[index] = el
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (!canResend && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setCanResend(true)
    }
    return () => clearInterval(interval)
  }, [timer, canResend])

  const handleInput = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Автоматически переходим к следующему полю
      if (value && index < 5) {
        inputs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = () => {
    const fullCode = code.join('')
    if (fullCode.length === 6) {
      onSubmit(fullCode)
    } else {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите все 6 цифр кода",
        variant: "destructive"
      })
    }
  }

  const handleResend = () => {
    onResend()
    setCanResend(false)
    setTimer(120)
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text')
    const numbers = pastedData.replace(/\D/g, '').split('').slice(0, 6)
    
    if (numbers.length) {
      const newCode = [...code]
      numbers.forEach((num, index) => {
        if (index < 6) {
          newCode[index] = num
        }
      })
      setCode(newCode)

      // Устанавливаем фокус на следующее поле после последней вставленной цифры
      const nextIndex = Math.min(numbers.length, 5)
      inputs.current[nextIndex]?.focus()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Подтверждение email</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Мы отправили код подтверждения на адрес {email}
          </p>
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={setInputRef(index)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button onClick={handleSubmit} className="w-full">
              Подтвердить
            </Button>
            <div className="text-sm text-muted-foreground">
              {canResend ? (
                <Button variant="link" onClick={handleResend}>
                  Отправить код повторно
                </Button>
              ) : (
                <p>
                  Повторная отправка через {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, '0')}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 