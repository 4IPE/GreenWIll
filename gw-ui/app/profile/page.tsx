'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, Edit, Mail, Phone, MapPin, LogOut, Settings } from 'lucide-react'
import FAQ from "@/components/faq"
import axiosConfig from '@/config/axiosConfig'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { OrderOutDto } from '@/types/order'
import { OrderReceiptModal } from "@/components/order-receipt-modal"
import { formatCurrency, formatOrderStatus } from "@/lib/utils"
import { OrderDetails } from "@/components/order-details"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileInput } from "@/components/ui/file-input"
import { LocationForm } from "@/components/ui/location-form"

interface Address {
  city: string;
  street: string;
  house: string;
  apartment: string;
  floor: string;
  entrance: string;
  latitude: number | null;
  longitude: number | null;
}

interface UserProfile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: {  
    role: string;
  };
  address?: Address;
}

interface ProductForm {
  name: string
  description: string
  price: string
  calories: string
  category: string
  img: string
  energyVal: string
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
    role: {  
      role: ''
    }
  })
  const [activeOrders, setActiveOrders] = useState<OrderOutDto[]>([])
  const [orderHistory, setOrderHistory] = useState<OrderOutDto[]>([])
  const [selectedOrder, setSelectedOrder] = useState<OrderOutDto | null>(null)
  const [waitingOrders, setWaitingOrders] = useState<OrderOutDto[]>([])
  const [deliveryOrders, setDeliveryOrders] = useState<OrderOutDto[]>([])
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [runningOrders, setRunningOrders] = useState<OrderOutDto[]>([])
  const [productForm, setProductForm] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    calories: '',
    category: '',
    img: '',
    energyVal: ''
  })
  const [roleUsername, setRoleUsername] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [address, setAddress] = useState<Address>({
    city: '',
    street: '',
    house: '',
    apartment: '',
    floor: '',
    entrance: '',
    latitude: null,
    longitude: null
  })

  useEffect(() => {
    if (!isLoading && !isLoggedIn && typeof window !== 'undefined') {
      router.push('/login')
      return
    }

    if (isLoggedIn) {
      const fetchUserInfo = async () => {
        try {
          const response = await axiosConfig.get("/api/user/profile", { withCredentials: true })
          console.log('User profile response:', response.data)
          setUserInfo(response.data)
          setInitialValues({
            email: response.data.email,
            phone: response.data.phone
          })
          if (response.data.address) {
            setAddress({
              city: response.data.address.city || '',
              street: response.data.address.street || '',
              house: response.data.address.house || '',
              apartment: response.data.address.apartment || '',
              floor: response.data.address.floor || '',
              entrance: response.data.address.entrance || '',
              latitude: response.data.address.latitude || null,
              longitude: response.data.address.longitude || null
            })
          }
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

  useEffect(() => {
    console.log('Current user info:', userInfo)
    
    const fetchOrders = async () => {
      if (isLoggedIn && userInfo.role?.role === 'ROLE_COOK') {
        try {
          const response = await axiosConfig.get('/api/orders/waiting')
          setWaitingOrders(response.data)
        } catch (err) {
          console.error('Failed to fetch waiting orders:', err)
        }
      }

      if (isLoggedIn && userInfo.role?.role === 'ROLE_COURIER') {
        try {
          const [deliveryResponse, runningResponse] = await Promise.all([
            axiosConfig.get('/api/orders/delivery'),
            axiosConfig.get('/api/orders/running')
          ])
          setDeliveryOrders(deliveryResponse.data)
          setRunningOrders(runningResponse.data)
        } catch (err) {
          console.error('Failed to fetch orders:', err)
        }
      }
    }

    fetchOrders()
  }, [isLoggedIn, userInfo])

  // Добавим функцию форматирования телефона
  const formatPhoneNumber = (value: string): string => {
    // Убираем все нецифровые символы
    const numbers = value.replace(/\D/g, '');
    
    // Если строка пустая, возвращаем пустую строку
    if (!numbers) return '';
    
    // Добавляем + в начало, если его нет
    if (!value.startsWith('+')) {
      return '+' + numbers;
    }
    
    return '+' + numbers;
  };

  // Обновляем handlePhoneChange
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setUserInfo({ ...userInfo, phone: formattedPhone });
  };

  // Обновляем handleSave с проверкой телефона
  const handleSave = async () => {
    try {
      // Сначала проверяем корректность формата телефона
      const phoneRegex = /^\+\d{11}$/; // Формат: +7XXXXXXXXXX
      if (userInfo.phone && !phoneRegex.test(userInfo.phone)) {
        toast({
          title: "Ошибка",
          description: "Неверный формат номера телефона. Должно быть 11 цифр после +",
          variant: "destructive"
        });
        return;
      }

      // Проверяем существование телефона до любых других действий
      if (userInfo.phone && userInfo.phone !== initialValues.phone) {
        try {
          // Убираем + перед отправкой на бэкенд ТОЛЬКО для проверки
          const phoneWithoutPlus = userInfo.phone.replace('+', '');
          const response = await axiosConfig.get(`/api/user/check-phone?phone=${phoneWithoutPlus}`);
          console.log('Ответ сервера при проверке телефона:', response.data);
          
          if (response.data) {
            toast({
              title: "Ошибка",
              description: "Номер телефона уже зарегистрирован в системе",
              variant: "destructive"
            });
            return;
          }
        } catch (err) {
          console.error('Ошибка при проверке телефона:', err);
          toast({
            title: "Ошибка",
            description: "Не удалось проверить номер телефона",
            variant: "destructive"
          });
          return;
        }
      }

      // Проверяем адрес только после успешной проверки телефона
      const hasStartedAddress = address.city || address.street || address.house || 
                              address.apartment || address.floor || address.entrance;

      if (hasStartedAddress) {
        const requiredFields = [
          { field: 'город', value: address.city },
          { field: 'улица', value: address.street },
          { field: 'дом', value: address.house },
          { field: 'квартира', value: address.apartment },
          { field: 'этаж', value: address.floor },
          { field: 'подъезд', value: address.entrance }
        ];

        const missingFields = requiredFields
          .filter(field => !field.value)
          .map(field => field.field);

        if (missingFields.length > 0) {
          toast({
            title: "Ошибка",
            description: `Необходимо заполнить все поля адреса: ${missingFields.join(', ')}`,
            variant: "destructive"
          });
          return;
        }
      }

      // Только после всех проверок отправляем запрос на обновление
      const updatedUserInfo = {
        ...userInfo,
        address: hasStartedAddress ? {
          city: address.city,
          street: address.street,
          house: address.house,
          apartment: address.apartment,
          floor: address.floor,
          entrance: address.entrance,
          latitude: address.latitude || null,
          longitude: address.longitude || null
        } : null
      };

      await axiosConfig.post(
        "/api/user/profile",
        updatedUserInfo,
        { withCredentials: true }
      );
      
      setIsEditing(false);
      
      const response = await axiosConfig.get("/api/user/profile", { withCredentials: true });
      setUserInfo(response.data);
      if (response.data.address) {
        setAddress(response.data.address);
      }

      toast({
        title: "Успех",
        description: "Профиль успешно обновлен",
      });
    } catch (err) {
      console.error("Ошибка при обновлении профиля:", err);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить профиль",
        variant: "destructive"
      });
    }
  };

  const sortedActiveOrders = useMemo(() => 
    [...activeOrders].sort((a, b) => b.id - a.id), 
    [activeOrders]
  )

  const sortedOrderHistory = useMemo(() => 
    [...orderHistory].sort((a, b) => b.id - a.id), 
    [orderHistory]
  )

  const checkRequiredFields = () => {
    if (!userInfo) return []
    const missing = []
    
    if (!userInfo.phone) missing.push('номер телефона')
    if (!userInfo.email) missing.push('email')
    if (!userInfo.firstName) missing.push('имя')
    if (!userInfo.lastName) missing.push('фамилию')
    if (!userInfo.address) missing.push('адрес')
    
    return missing
  }

  const handleAcceptOrder = async (orderId: number) => {
    const missingFields = checkRequiredFields()
    if (missingFields.length > 0) {
      toast({
        title: "Необходимо заполнить профиль",
        description: `Пожалуйста, укажите ${missingFields.join(', ')} перед принятием заказов`,
        variant: "destructive",
      })
      return
    }
    
    try {
      await axiosConfig.patch('/api/order/status/accept', null, {
        params: { orderId }
      })
      const response = await axiosConfig.get('/api/orders/waiting')
      setWaitingOrders(response.data)
    } catch (err) {
      console.error('Failed to accept order:', err)
    }
  }

  const handleReadyOrder = async (orderId: number) => {
    try {
      await axiosConfig.patch('/api/order/status/ready', null, {
        params: { orderId }
      })
      // Обновляем список заказов
      const response = await axiosConfig.get('/api/orders/waiting')
      setWaitingOrders(response.data)
    } catch (err) {
      console.error('Failed to mark order as ready:', err)
    }
  }

  const handleRejectOrder = async (orderId: number) => {
    try {
      await axiosConfig.patch('/api/order/status', null, {
        params: { 
          idOrder: orderId,
          status: 'REJECTED'
        }
      })
      const response = await axiosConfig.get('/api/orders/waiting')
      setWaitingOrders(response.data)
    } catch (err) {
      console.error('Failed to reject order:', err)
    }
  }

  const handleDeliveredOrder = async (orderId: number) => {
    const missingFields = checkRequiredFields()
    if (missingFields.length > 0) {
      toast({
        title: "Необходимо заполнить профиль",
        description: `Пожалуйста, укажите ${missingFields.join(', ')} перед принятием доставок`,
        variant: "destructive",
      })
      return
    }

    try {
      await axiosConfig.patch('/api/order/status/delivered', null, {
        params: { orderId }
      })
      const response = await axiosConfig.get('/api/orders/delivery')
      setDeliveryOrders(response.data)
    } catch (err) {
      console.error('Failed to mark order as delivered:', err)
    }
  }

  const handleTakeOrder = async (orderId: number) => {
    const missingFields = checkRequiredFields()
    if (missingFields.length > 0) {
      toast({
        title: "Необходимо заполнить профиль",
        description: `Пожалуйста, укажите ${missingFields.join(', ')} перед принятием доставок`,
        variant: "destructive",
      })
      return
    }

    try {
      await axiosConfig.patch('/api/order/status/take', null, {
        params: { orderId }
      })
      const [deliveryResponse, runningResponse] = await Promise.all([
        axiosConfig.get('/api/orders/delivery'),
        axiosConfig.get('/api/orders/running')
      ])
      setDeliveryOrders(deliveryResponse.data)
      setRunningOrders(runningResponse.data)
    } catch (err) {
      console.error('Failed to take order:', err)
    }
  }

  const handleLogout = () => {
    setShowLogoutDialog(true)
  }

  const confirmLogout = async () => {
    try {
      await axiosConfig.post('/api/auth/logout')
      router.push('/login')
    } catch (err) {
      console.error('Failed to logout:', err)
    }
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    try {
      await axiosConfig.post('/api/admin/add', {
        name: productForm.name,
        description: productForm.description,
        price: productForm.price,
        calories: productForm.calories,
        category: productForm.category,
        img: productForm.img,
        energyVal: productForm.energyVal
      })
      
      toast({
        title: "Успех",
        description: "Продукт успешно добавлен",
      })
      setProductForm({
        name: '',
        description: '',
        price: '',
        calories: '',
        category: '',
        img: '',
        energyVal: ''
      })
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить продукт",
        variant: "destructive",
      })
      console.error('Failed to add product:', err)
    }
    
    setIsSaving(false)
  }

  const handleRoleChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await axiosConfig.get('/api/admin/edit/role', {
        params: {
          username: roleUsername,
          roleName: selectedRole
        }
      })
      toast({
        title: "Успех",
        description: "Роль пользователя обновлена",
      })
      setRoleUsername('')
      setSelectedRole('')
    } catch (err) {
      toast({
        title: "Ошибка", 
        description: "Не удалось обновить роль",
        variant: "destructive",
      })
      console.error('Failed to change role:', err)
    }

    setIsSaving(false)
  }

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
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <UserCircle className="h-12 w-12" />
            <h1 className="text-3xl font-bold">Мой профиль</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Выйти
          </Button>
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
              {userInfo.role?.role === 'ROLE_COOK' && (
                <TabsTrigger value="cooking" className={tabStyles}>
                  Заказы
                </TabsTrigger>
              )}
              {userInfo.role?.role === 'ROLE_COURIER' && (
                <>
                  <TabsTrigger value="delivery" className={tabStyles}>
                    Доставка
                  </TabsTrigger>
                  <TabsTrigger value="running" className={tabStyles}>
                    В доставке
                  </TabsTrigger>
                </>
              )}
              {userInfo.role?.role === 'ROLE_ADMIN' && (
                <TabsTrigger value="settings" className={tabStyles}>
                  <Settings className="w-4 h-4 mr-2" />
                  Настройки
                </TabsTrigger>
              )}
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
                        <Label 
                          htmlFor="phone" 
                          className="flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4" /> Телефон
                        </Label>
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={handlePhoneChange}
                          placeholder="+7XXXXXXXXXX"
                          readOnly={!!initialValues.phone}
                          disabled={!!initialValues.phone}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Адрес доставки</Label>
                        <LocationForm
                          value={address}
                          onChange={(newAddress: Address) => setAddress(newAddress)}
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
                          <strong>Адрес:</strong>{" "}
                          {userInfo.address ? (
                            <>
                              г. {userInfo.address.city}, 
                              ул. {userInfo.address.street}, 
                              д. {userInfo.address.house}
                              {userInfo.address.apartment && `, кв. ${userInfo.address.apartment}`}
                              {userInfo.address.floor && `, этаж ${userInfo.address.floor}`}
                              {userInfo.address.entrance && `, подъезд ${userInfo.address.entrance}`}
                            </>
                          ) : "Не указано"}
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

            {userInfo.role?.role === 'ROLE_COOK' && (
              <TabsContent value="cooking">
                <Card>
                  <CardHeader>
                    <CardTitle>Заказы в ожидании</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {waitingOrders.map((order) => (
                        <motion.div
                          key={order.id}
                          className="p-4 border rounded"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <OrderDetails 
                            order={order} 
                            showCookingInfo={true}
                          />
                          {order.status === 'WAITING' && (
                            <div className="flex gap-2 mt-4">
                              <Button onClick={() => handleAcceptOrder(order.id)}>
                                Принять в работу
                              </Button>
                              <Button 
                                variant="destructive"
                                onClick={() => handleRejectOrder(order.id)}
                              >
                                Отклонить
                              </Button>
                            </div>
                          )}
                          {order.status === 'ACTIVITY' && (
                            <div className="flex gap-2 mt-4">
                              <Button onClick={() => handleReadyOrder(order.id)}>
                                Готов ✓
                              </Button>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {userInfo.role?.role === 'ROLE_COURIER' && (
              <>
                <TabsContent value="delivery">
                  <Card>
                    <CardHeader>
                      <CardTitle>Заказы на доставку</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {deliveryOrders.map((order) => (
                          <motion.div
                            key={order.id}
                            className="p-4 border rounded"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <OrderDetails 
                              order={order} 
                              showDeliveryInfo={true}
                            />
                            <div className="flex gap-2 mt-4">
                              <Button onClick={() => handleTakeOrder(order.id)}>
                                Взять в доставку
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="running">
                  <Card>
                    <CardHeader>
                      <CardTitle>Заказы в доставке</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {runningOrders.map((order) => (
                          <motion.div
                            key={order.id}
                            className="p-4 border rounded"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <OrderDetails 
                              order={order} 
                              showDeliveryInfo={true}
                            />
                            <div className="flex gap-2 mt-4">
                              <Button onClick={() => handleDeliveredOrder(order.id)}>
                                Доставлено
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}

            {userInfo.role?.role === 'ROLE_ADMIN' && (
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Добавить продукт</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddProduct} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Название</Label>
                          <Input
                            id="name"
                            value={productForm.name}
                            onChange={(e) => setProductForm(prev => ({...prev, name: e.target.value}))}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="description">Описание</Label>
                          <Textarea
                            id="description"
                            value={productForm.description}
                            onChange={(e) => setProductForm(prev => ({...prev, description: e.target.value}))}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="price">Цена</Label>
                          <Input
                            id="price"
                            value={productForm.price}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '') // Только цифры
                              if (value === '' || parseInt(value) >= 0) {
                                setProductForm(prev => ({...prev, price: value}))
                              }
                            }}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="calories">Калории</Label>
                          <Input
                            id="calories"
                            value={productForm.calories}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '') // Только цифры
                              if (value === '' || parseInt(value) >= 0) {
                                setProductForm(prev => ({...prev, calories: value}))
                              }
                            }}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="category">Категория</Label>
                          <Input
                            id="category"
                            value={productForm.category}
                            onChange={(e) => setProductForm(prev => ({...prev, category: e.target.value}))}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="image">Изображение</Label>
                          <FileInput
                            id="image"
                            onChange={(path) => setProductForm(prev => ({...prev, img: path}))}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="energyVal">КБЖУ</Label>
                          <Input
                            id="energyVal"
                            value={productForm.energyVal}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '')
                              if (value === '' || parseInt(value) >= 0) {
                                setProductForm(prev => ({...prev, energyVal: value}))
                              }
                            }}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            required
                          />
                        </div>

                        <Button type="submit" disabled={isSaving}>
                          {isSaving ? "Сохранение..." : "Добавить продукт"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Управление ролями</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleRoleChange} className="space-y-4">
                        <div>
                          <Label htmlFor="username">Имя пользователя</Label>
                          <Input
                            id="username"
                            value={roleUsername}
                            onChange={(e) => setRoleUsername(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="role">Роль</Label>
                          <Select 
                            value={selectedRole} 
                            onValueChange={setSelectedRole}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите роль" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ROLE_USER">Пользователь</SelectItem>
                              <SelectItem value="ROLE_COOK">Повар</SelectItem>
                              <SelectItem value="ROLE_COURIER">Курьер</SelectItem>
                              <SelectItem value="ROLE_ADMIN">Администратор</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button type="submit" disabled={isSaving}>
                          {isSaving ? "Сохранение..." : "Изменить роль"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            )}
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

      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение выхода</DialogTitle>
            <DialogDescription>
              Вы действительно хотите выйти из аккаунта?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutDialog(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={confirmLogout}>
              Выйти
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

