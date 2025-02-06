'use client'

import * as React from "react"
import { Input } from "@/components/ui/input"

interface AddressOption {
  value: string
  unrestricted_value: string
  data: {
    city: string
    street: string
    house: string
  }
}

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}

export function AddressAutocomplete({ value, onChange, className, placeholder }: AddressAutocompleteProps) {
  const [options, setOptions] = React.useState<AddressOption[]>([])
  const [inputValue, setInputValue] = React.useState(value)
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const debounceTimeout = React.useRef<NodeJS.Timeout>()

  const searchAddresses = async (query: string) => {
    if (query.length < 2) {
      setOptions([])
      return
    }

    try {
      const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token 1f678ed76cc10315f244e278fc84c6c41ea1bce4'
        },
        body: JSON.stringify({
          query,
          count: 5,
          language: "ru",
          locations: [
            { city: "Вологда" }
          ],
          restrict_value: true
        })
      })

      const data = await response.json()
      const vologdaAddresses = data.suggestions?.filter((suggestion: AddressOption) => 
        suggestion.data.city === "Вологда"
      ) || []
      setOptions(vologdaAddresses)
    } catch (error) {
      console.error('Ошибка при поиске адреса:', error)
      setOptions([])
    }
  }

  const formatDisplayAddress = (option: AddressOption) => {
    const street = option.data.street || ''
    const house = option.data.house || ''
    return `г. Вологда, ${street}${house ? `, ${house}` : ''}`
  }

  React.useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      searchAddresses(inputValue)
    }, 350)

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [inputValue])

  return (
    <div className="relative w-full">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
          setShowSuggestions(true)
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder || "Введите адрес..."}
        className={className}
      />
      
      {showSuggestions && options.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-md border shadow-lg max-h-[200px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                const formattedAddress = formatDisplayAddress(option)
                setInputValue(formattedAddress)
                onChange(formattedAddress)
                setShowSuggestions(false)
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {formatDisplayAddress(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 