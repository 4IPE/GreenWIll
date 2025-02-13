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
      sitekey="ysc1_azPN0UKsNUkR7JF4dOMhesoixFTeEKfUvqAVqwlkc123083c"
      onSuccess={onSuccess}
      onChallengeHidden={() => setVisible(false)}
      visible={visible}
    />
  )
} 