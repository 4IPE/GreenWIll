import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/header'
import Footer from '../components/footer'
import { CartProvider } from '@/context/CartContext'
import { Toaster } from "@/components/ui/toaster"
import { OrderNotificationsProvider } from '@/context/OrderNotificationsContext'
import { OrderNotifications } from '@/components/order-notifications'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GreenWill',
  description: 'Здоровое питание с доставкой',
  icons: {
    icon: 'https://i.ibb.co/p68DQDdx/mini-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/mini-logo.png" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <OrderNotificationsProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow bg-background">{children}</main>
              <Footer />
            </div>
            <OrderNotifications />
          </OrderNotificationsProvider>
        </CartProvider>
        <Toaster />
      </body>
    </html>
  )
}

