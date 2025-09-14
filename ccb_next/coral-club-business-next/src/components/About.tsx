
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Globe, Heart } from "lucide-react";

const About = () => {
  const achievements = [
    {
      icon: Award,
      title: "20+ лет опыта",
      description: "Более двух десятилетий успешной работы в сфере здоровья"
    },
    {
      icon: Users,
      title: "Миллионы клиентов",
      description: "Доверие людей по всему миру подтверждает качество продукции"
    },
    {
      icon: Globe,
      title: "Международное присутствие",
      description: "Представительства в десятках стран мира"
    },
    {
      icon: Heart,
      title: "Философия здоровья",
      description: "Комплексный подход к улучшению качества жизни"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            О компании Coral Club
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Coral Club — это международная компания, которая более 25 лет помогает людям
            улучшать качество жизни через доступ к инновационным продуктам для здоровья
            и современным технологиям оздоровления.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Наша миссия
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Мы верим, что каждый человек заслуживает здоровую и полноценную жизнь. 
              Наша цель — предоставить доступ к качественным продуктам и знаниям, 
              которые помогают достичь оптимального состояния здоровья.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Coral Club объединяет науку, природу и инновации, создавая продукты, 
              которые действительно работают и приносят пользу людям по всему миру.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Наши ценности</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <span>Качество и безопасность продукции</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <span>Научный подход к разработке</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <span>Поддержка партнёров и клиентов</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <span>Социальная ответственность</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{achievement.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
