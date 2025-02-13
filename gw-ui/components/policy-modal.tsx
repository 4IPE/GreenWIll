'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PolicyModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'privacy' | 'terms'
}

export function PolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {type === 'privacy' ? 'Политика конфиденциальности' : 'Условия использования'}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          {type === 'privacy' ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">1. Общие положения</h2>
              <p>
                Настоящая политика конфиденциальности описывает, как GreenWill собирает, 
                использует и защищает информацию, которую вы предоставляете при использовании нашего сервиса.
              </p>

              <h2 className="text-xl font-semibold">2. Собираемая информация</h2>
              <p>Мы собираем следующие типы информации:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Имя пользователя и email при регистрации</li>
                <li>Информация о действиях в системе</li>
                <li>Технические данные (IP-адрес, тип браузера)</li>
                <li>Информация об экологических инициативах</li>
              </ul>

              {/* ... остальные разделы политики ... */}
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">1. Принятие условий</h2>
              <p>
                Используя сервис GreenWill, вы принимаете настоящие условия использования 
                в полном объеме.
              </p>

              <h2 className="text-xl font-semibold">2. Регистрация</h2>
              <p>При регистрации вы обязуетесь:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Предоставить достоверную информацию</li>
                <li>Создать только один аккаунт</li>
                <li>Обеспечить безопасность своего аккаунта</li>
              </ul>

              {/* ... остальные разделы условий ... */}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 