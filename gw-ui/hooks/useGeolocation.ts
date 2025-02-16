'use client'

import { useState, useCallback, useEffect } from 'react'

interface GeolocationState {
  latitude: number;
  longitude: number;
}

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationState | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается вашим браузером')
      return
    }

    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        setIsLoading(false)
      },
      (error) => {
        let errorMessage = 'Произошла ошибка при получении местоположения'
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Пожалуйста, разрешите доступ к геолокации'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Информация о местоположении недоступна'
            break
          case error.TIMEOUT:
            errorMessage = 'Превышено время ожидания запроса местоположения'
            break
        }
        
        setError(errorMessage)
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    )
  }, [])

  // Получаем местоположение при монтировании компонента
  useEffect(() => {
    updateLocation()
  }, [updateLocation])

  return {
    location,
    isLoading,
    error,
    updateLocation
  }
} 