'use client'

import { SmartCaptcha as YandexCaptcha } from '@yandex/smart-captcha'
import { cn } from "@/lib/utils"

interface SmartCaptchaProps {
  onSuccess?: (token: string) => void;
  className?: string;
}

export function SmartCaptcha({ onSuccess, className }: SmartCaptchaProps) {
  return (
    <div className={cn("w-full flex justify-center items-center", className)}>
      <style jsx global>{`
        .smart-captcha {
          width: 100% !important;
          max-width: none !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }

        .smart-captcha__checkbox-container {
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
        }

        .smart-captcha__checkbox {
          width: 100% !important;
          max-width: none !important;
          height: 42px !important; /* Высота как у input полей */
          background-color: #5a7080 !important;
          border: 2px solid #5a7080 !important;
          border-radius: 11px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 16px !important;
        }

        .smart-captcha__checkbox-mark {
          color: #fff !important;
        }

        .smart-captcha__button {
          width: 100% !important;
          height: 42px !important;
          background-color: #5a7080 !important;
          color: #fff !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .smart-captcha__button:hover {
          background-color: #485863 !important;
        }

        .smart-captcha__error {
          width: 100% !important;
          text-align: center !important;
          background-color: rgba(255, 51, 51, 0.12) !important;
          color: #ff3333 !important;
        }

        @media (max-width: 768px) {
          .smart-captcha {
            transform: scale(0.95);
            transform-origin: center;
          }
        }

        @media (max-width: 480px) {
          .smart-captcha {
            transform: scale(0.9);
            transform-origin: center;
          }
        }
      `}</style>
      <YandexCaptcha
        sitekey="ysc1_azPN0UKsNUkR7JF4dOMhesoixFTeEKfUvqAVqwlkc123083c"
        onSuccess={onSuccess}
        theme="dark"
      />
    </div>
  )
} 