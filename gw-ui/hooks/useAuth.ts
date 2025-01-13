import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axiosConfig from '@/config/axiosConfig'

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkTokenStatus = async () => {
      try {
        const response = await axiosConfig.get('/api/user/status', { withCredentials: true })
        if (response.status === 200) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
          if (typeof window !== 'undefined') {
            router.push('/login')
          }
        }
      } catch (err) {
        setIsLoggedIn(false)
        if (typeof window !== 'undefined') {
          router.push('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (typeof window !== 'undefined') {
      checkTokenStatus()
    }
  }, [router])

  return { isLoggedIn, isLoading }
}

export default useAuth 