import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import axiosConfig from '@/config/axiosConfig'

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Пути, которые не требуют авторизации
  const publicRoutes = ['/menu', '/nutrition', '/']

  useEffect(() => {
    const checkTokenStatus = async () => {
      try {
        const response = await axiosConfig.get('/api/user/status', { withCredentials: true })
        if (response.status === 200) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
          // Редиректим только если это не публичный маршрут
          if (typeof window !== 'undefined' && !publicRoutes.includes(pathname)) {
            router.push('/login')
          }
        }
      } catch (err) {
        setIsLoggedIn(false)
        // Редиректим только если это не публичный маршрут
        if (typeof window !== 'undefined' && !publicRoutes.includes(pathname)) {
          router.push('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (typeof window !== 'undefined') {
      checkTokenStatus()
    }
  }, [router, pathname])

  return { isLoggedIn, isLoading }
}

export default useAuth 