
import { Card, CardContent } from "@/components/ui/card";
import { Globe, ShieldCheck, TrendingUp, Users, Award, Heart } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Globe,
      title: "Мировой бренд",
      description: "Более 20 лет на рынке оздоровительных продуктов с проверенной репутацией"
    },
    {
      icon: Heart,
      title: "Продукция для жизни",
      description: "Детокс программы, витамины, ферменты и уникальные концепции как Корал-Майн"
    },
    {
      icon: TrendingUp,
      title: "Выгодные условия",
      description: "20% скидка для участников клуба и программы лояльности"
    },
    {
      icon: Users,
      title: "Поддержка на каждом шагу",
      description: "Обучающие материалы, семинары и консультации от специалистов"
    },
    {
      icon: Award,
      title: "Проверенные стратегии",
      description: "Эффективные программы роста и долгосрочные проекты"
    },
    {
      icon: ShieldCheck,
      title: "Простое начало",
      description: "Бесплатная регистрация без обязательств и сложных процедур"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Основные преимущества сотрудничества
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Присоединяйтесь к международному движению и откройте новые возможности для роста
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
