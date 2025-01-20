'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, Edit, Mail, Phone, MapPin } from 'lucide-react'
import FAQ from "@/components/faq"
import axiosConfig from '@/config/axiosConfig'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { OrderOutDto } from '@/types/order'
import { OrderReceiptModal } from "@/components/order-receipt-modal"
import { formatCurrency, formatOrderStatus } from "@/lib/utils"

interface UserProfile {
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
}

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

const sidebarWidth = "w-full md:w-[200px] min-w-[200px]"
const tabStyles = "w-full justify-start px-4 h-14 transition-all hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"

export default function Profile() {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [initialValues, setInitialValues] = useState({
    email: '',
    phone: ''
  })
  const [userInfo, setUserInfo] = useState<UserProfile>({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  })
  const [activeOrders, setActiveOrders] = useState<OrderOutDto[]>([])
  const [orderHistory, setOrderHistory] = useState<OrderOutDto[]>([])
  const [selectedOrder, setSelectedOrder] = useState<OrderOutDto | null>(null)

  useEffect(() => {
    if (!isLoading && !isLoggedIn && typeof window !== 'undefined') {
      router.push('/login')
      return
    }

    if (isLoggedIn) {
      const fetchUserInfo = async () => {
        try {
          const response = await axiosConfig.get("/api/user/profile", { withCredentials: true })
          setUserInfo(response.data)
          setInitialValues({
            email: response.data.email,
            phone: response.data.phone
          })
        } catch (err) {
          console.error('Failed to fetch user info:', err)
        }
      }

      fetchUserInfo()
    }
  }, [isLoggedIn, isLoading, router])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [activeResponse, historyResponse] = await Promise.all([
          axiosConfig.get('/api/orders/active'),
          axiosConfig.get('/api/orders/history')
        ])
        setActiveOrders([...activeResponse.data].sort((a, b) => b.id - a.id))
        setOrderHistory([...historyResponse.data].sort((a, b) => b.id - a.id))
      } catch (err) {
        console.error('Failed to fetch orders:', err)
      }
    }

    if (isLoggedIn) {
      fetchOrders()
    }
  }, [isLoggedIn])

  const handleSave = async () => {
    try {
      await axiosConfig.post(
        "/api/user/profile",
        userInfo,
        { withCredentials: true }
      )
      setIsEditing(false)
      
      // Обновляем данные после успешного сохранения
      const response = await axiosConfig.get("/api/user/profile", { withCredentials: true })
      setUserInfo(response.data)
    } catch (err) {
      console.error("Ошибка при обновлении профиля:", err)
    }
  }

  const sortedActiveOrders = useMemo(() => 
    [...activeOrders].sort((a, b) => b.id - a.id), 
    [activeOrders]
  )

  const sortedOrderHistory = useMemo(() => 
    [...orderHistory].sort((a, b) => b.id - a.id), 
    [orderHistory]
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <UserCircle className="h-12 w-12" />
          <h1 className="text-3xl font-bold">Мой профиль</h1>
        </div>

        <Tabs defaultValue="profile" className="flex flex-col md:flex-row gap-8">
          <div className={sidebarWidth}>
            <TabsList className="flex flex-col h-auto p-0 bg-transparent">
              <TabsTrigger value="profile" className={tabStyles}>
                Личные данные
              </TabsTrigger>
              <TabsTrigger value="orders" className={tabStyles}>
                Текущие заказы
              </TabsTrigger>
              <TabsTrigger value="history" className={tabStyles}>
                История заказов
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1">
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Личные данные</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Имя</Label>
                          <Input
                            id="firstName"
                            value={userInfo.firstName}
                            onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                            placeholder="Введите имя"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Фамилия</Label>
                          <Input
                            id="lastName"
                            value={userInfo.lastName}
                            onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                            placeholder="Введите фамилию"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="username">Логин</Label>
                        <Input
                          id="username"
                          value={userInfo.username}
                          readOnly
                          disabled
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" /> Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          placeholder="Введите email"
                          readOnly={!!initialValues.email}
                          disabled={!!initialValues.email}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" /> Телефон
                        </Label>
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                          placeholder="+7 (999) 999-99-99"
                          readOnly={!!initialValues.phone}
                          disabled={!!initialValues.phone}
                        />
                      </div>

                      <div>
                        <Label htmlFor="address" className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> Адрес
                        </Label>
                        <Input
                          id="address"
                          value={userInfo.address}
                          onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                          placeholder="Введите адрес"
                        />
                      </div>

                      <Button onClick={handleSave}>Сохранить</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center">
                          <UserCircle className="h-4 w-4" />
                        </div>
                        <p className="-mt-0.5">
                          <strong>Имя:</strong> {userInfo.firstName || "Не указано"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center">
                          <UserCircle className="h-4 w-4" />
                        </div>
                        <p className="-mt-0.5">
                          <strong>Фамилия:</strong> {userInfo.lastName || "Не указано"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center">
                          <UserCircle className="h-4 w-4" />
                        </div>
                        <p className="-mt-0.5">
                          <strong>Логин:</strong> {userInfo.username}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center">
                          <Mail className="h-4 w-4" />
                        </div>
                        <p className="-mt-0.5">
                          <strong>Email:</strong> {userInfo.email || "Не указано"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center">
                          <Phone className="h-4 w-4" />
                        </div>
                        <p className="-mt-0.5">
                          <strong>Телефон:</strong> {userInfo.phone || "Не указано"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <p className="-mt-0.5">
                          <strong>Адрес:</strong> {userInfo.address || "Не указано"}
                        </p>
                      </div>
                      <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                        <Edit className="h-4 w-4" /> Редактировать
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Текущие Заказы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedActiveOrders.map((order) => (
                      <motion.div
                        key={order.cart.id}
                        className="p-4 border rounded cursor-pointer hover:bg-accent/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <p><strong>Номер заказа:</strong> #{order.id}</p>
                        <p><strong>Статус:</strong> {formatOrderStatus(order.status)}</p>
                        <p><strong>Сумма:</strong> {formatCurrency(order.cart.cartItem.reduce((sum: number, item) => 
                          sum + item.product.price * item.countProducts, 0))}</p>
                      </motion.div>
                    ))}
                    {sortedActiveOrders.length === 0 && (
                      <p className="text-center text-muted-foreground">Нет активных заказов</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>История Заказов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedOrderHistory.map((order) => (
                      <motion.div
                        key={order.cart.id}
                        className="p-4 border rounded cursor-pointer hover:bg-accent/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <p><strong>Номер заказа:</strong> #{order.id}</p>
                        <p><strong>Статус:</strong> {formatOrderStatus(order.status)}</p>
                        <p><strong>Сумма:</strong> {formatCurrency(order.cart.cartItem.reduce((sum: number, item) => 
                          sum + item.product.price * item.countProducts, 0))}</p>
                      </motion.div>
                    ))}
                    {sortedOrderHistory.length === 0 && (
                      <p className="text-center text-muted-foreground">История заказов пуста</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-12">
          <FAQ />
        </div>
      </motion.div>

      <OrderReceiptModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  )
}

