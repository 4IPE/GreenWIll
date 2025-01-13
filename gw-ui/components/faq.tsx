import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Как я могу отследить свой заказ?",
    answer: "Вы можете отследить свой заказ в разделе 'Активные Заказы' в вашем профиле. Там вы найдете информацию о статусе и ожидаемом времени доставки."
  },
  {
    question: "Какие способы оплаты вы принимаете?",
    answer: "Мы принимаем оплату банковскими картами (Visa, MasterCard, Мир), а также наличными при доставке."
  },
  {
    question: "Могу ли я изменить или отменить свой заказ?",
    answer: "Вы можете изменить или отменить заказ в течение 15 минут после его оформления. Для этого свяжитесь с нашей службой поддержки."
  },
  {
    question: "Есть ли у вас вегетарианские опции?",
    answer: "Да, у нас есть широкий выбор вегетарианских и веганских блюд. Вы можете найти их в специальном разделе нашего меню."
  },
  {
    question: "Как часто обновляется меню?",
    answer: "Наше меню обновляется еженедельно. Мы добавляем новые блюда и сезонные предложения, чтобы вы всегда могли попробовать что-то новое."
  }
]

export default function FAQ() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Часто задаваемые вопросы</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

