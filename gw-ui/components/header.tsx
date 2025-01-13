'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, MenuIcon, Utensils } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/context/CartContext"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems, isLoading } = useCart()

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">GreenWill</Link>
        <nav className="hidden md:flex space-x-4 items-center">
          <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Link href="/menu">
              <Utensils className="w-4 h-4 mr-2" />
              Menu
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Link href="/profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Link href="/basket">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Basket
              <Badge>
                {isLoading ? '...' : cartItems.length}
              </Badge>
            </Link>
          </Button>
        </nav>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <MenuIcon className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-primary text-primary-foreground">
            <nav className="flex flex-col space-y-4 mt-8">
              <Button asChild variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                <Link href="/menu">
                  <Utensils className="w-4 h-4 mr-2" />
                  Menu
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                <Link href="/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                <Link href="/basket">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Basket
                  <Badge>
                    {isLoading ? '...' : cartItems.length}
                  </Badge>
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

