
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Елена Рулёва",
      text: "Начав работать с Coral Club, я увидела, как мои усилия преобразились в стабильный доход и возможность помочь другим людям. Их продукция действительно делает разницу в качестве жизни!",
      role: "Партнёр с 2019 года"
    },
    {
      name: "Андрей Вирц",
      text: "Программа Коло-Вада изменила мой подход к детоксу. Теперь я не только помогаю клиентам, но и рекомендую ту продукцию, которая действительно работает!",
      role: "Консультант по здоровью"
    },
    {
      name: "Мария Петрова",
      text: "Coral Club дал мне возможность совместить работу с заботой о семье. Гибкий график и отличная поддержка команды — это то, что нужно современной маме!",
      role: "Региональный представитель"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Отзывы наших партнёров
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Реальные истории успеха от людей, которые изменили свою жизнь с Coral Club
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg relative overflow-hidden">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-teal-400 mb-4 opacity-50" />
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
