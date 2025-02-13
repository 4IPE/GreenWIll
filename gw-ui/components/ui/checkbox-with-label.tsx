'use client'

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PolicyModal } from "@/components/policy-modal"

interface CheckboxWithLabelProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

export function CheckboxWithLabel({ checked, onCheckedChange, error }: CheckboxWithLabelProps) {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={checked} 
            onCheckedChange={onCheckedChange}
          />
          <Label 
            htmlFor="terms" 
            className="text-sm text-muted-foreground"
          >
            Я согласен с{" "}
            <button
              type="button"
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-primary hover:underline"
            >
              политикой конфиденциальности
            </button>
            {" "}и{" "}
            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="text-primary hover:underline"
            >
              условиями использования
            </button>
          </Label>
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>

      <PolicyModal 
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
        type="privacy"
      />

      <PolicyModal 
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        type="terms"
      />
    </>
  )
} 