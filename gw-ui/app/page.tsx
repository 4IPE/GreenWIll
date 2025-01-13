'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from 'framer-motion'

const features = [
  {
    title: "Свежие ингредиенты",
    description: "Мы используем самые свежие, выращенные на местных фермах ингредиенты для наших блюд.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5ed89f0f-f398-49f3-a360-25ac679df515-b7UC0fxzJTLu6SPUotxIVWaJolLD8q.jpeg"
  },
  {
    title: "Быстрая доставка",
    description: "Ваше здоровое питание всего в нескольких кликах от вашей двери.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11ff62c3-a88e-46a7-959b-f61b8f5bdfa2-6FIoKJBCVw8oSNDNvXWSMiBUkTRcmu.jpeg"
  },
  {
    title: "Одобрено диетологами",
    description: "Наши блюда разработаны и одобрены сертифицированными диетологами.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3485209d-2b30-4c32-b795-15f4149b2cae-WJezWxy890D1221FUEeNy06I9bkYlN.jpeg"
  }
]

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen">
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
  {/* Background image with overlay */}
  <div className="absolute inset-0 z-0">
    <Image
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3063115c-01e0-4c14-9c8d-75e773f97b5a-epXbiFKuCmHfp4bravJk3BCeAXBv9Z.jpeg"
      alt="Green Apple"
      fill
      className="object-cover blur-sm scale-110"
      priority
    />
    <div className="absolute inset-0 bg-black/30" />
  </div>
  
  {/* Content */}
  <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Добро пожаловать в GreenWill</h1>
      <p className="text-xl md:text-2xl mb-8 text-white/90">Здоровая еда, быстрая доставка</p>
      <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Link href="/menu">Изучить наше меню</Link>
      </Button>
    </motion.div>
  </div>
</section>

      {showContent && (
        <>
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <motion.h2 
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                О компании GreenWill
              </motion.h2>
              <motion.div 
                className="max-w-2xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="mb-4">
                  В GreenWill мы страстно увлечены доставкой питательных и вкусных блюд прямо к вашей двери. Наша миссия - сделать здоровое питание удобным и приятным для каждого.
                </p>
                <p>
                  Основанная в 2023 году, наша компания тесно сотрудничает с местными фермерами и диетологами для создания сбалансированных, вкусных блюд, которые питают ваше тело и радуют вкусовые рецепторы.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-16 px-4 bg-primary/10">
            <div className="container mx-auto">
              <motion.h2 
                className="text-3xl font-bold mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Почему выбирают GreenWill?
              </motion.h2>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col md:flex-row items-center mb-24 last:mb-0"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg object-cover"
                    />
                  </div>
                  <div className={`md:w-1/2 mt-8 md:mt-0 ${index % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:order-1 md:pr-12'}`}>
                    <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-lg">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-16 px-4">
            <div className="container mx-auto text-center">
              <motion.h2 
                className="text-3xl font-bold mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Присоединяйтесь к сообществу GreenWill
              </motion.h2>
              <motion.p 
                className="mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Почувствуйте разницу здорового и удобного питания. Начните свой путь с GreenWill сегодня и измените свой подход к еде.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/menu">Начать</Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </>
      )}

      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center bg-primary rounded-full shadow-lg"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
      >
        <Link href="#top" className="text-primary-foreground">
          ↑
        </Link>
      </motion.div>
    </div>
  )
}

