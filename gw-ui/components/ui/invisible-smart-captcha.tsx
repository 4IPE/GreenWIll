'use client'

import { InvisibleSmartCaptcha as YandexCaptcha } from '@yandex/smart-captcha'
import { useState } from 'react'

interface InvisibleSmartCaptchaProps {
  onSuccess?: (token: string) => void;
}

export function InvisibleSmartCaptcha({ onSuccess }: InvisibleSmartCaptchaProps) {
  const [visible, setVisible] = useState(false)

  return (
    <YandexCaptcha
      sitekey={process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_KEY!}
      onSuccess={onSuccess}
      onChallengeHidden={() => setVisible(false)}
      visible={visible}
    />
  )
} 