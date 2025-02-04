import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">О GreenWill</h3>
            <p>Мы доставляем быструю вкусную и полезную еду.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрый доступ</h3>
            <ul className="space-y-2">
              <li><Link href="/menu" className="hover:underline">Меню</Link></li>
              <li><Link href="/contact" className="hover:underline">Контакты</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <p>Почта: info@greenwill.com</p>
            <p>Телефон: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2025 GreenWill. Все права защищены</p>
        </div>
      </div>
    </footer>
  )
}

