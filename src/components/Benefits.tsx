import { Card, CardContent } from "@/components/ui/card";
import { Globe, ShieldCheck, TrendingUp, Users, Award, Heart } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Benefits = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Globe,
      title: t('benefits.benefit_1_title'),
      description: t('benefits.benefit_1_desc')
    },
    {
      icon: Heart,
      title: t('benefits.benefit_2_title'),
      description: t('benefits.benefit_2_desc')
    },
    {
      icon: TrendingUp,
      title: t('benefits.benefit_3_title'),
      description: t('benefits.benefit_3_desc')
    },
    {
      icon: Users,
      title: t('benefits.benefit_4_title'),
      description: t('benefits.benefit_4_desc')
    },
    {
      icon: Award,
      title: t('benefits.benefit_5_title'),
      description: t('benefits.benefit_5_desc')
    },
    {
      icon: ShieldCheck,
      title: t('benefits.benefit_6_title'),
      description: t('benefits.benefit_6_desc')
    }
  ];

  return (
      <section id="benefits" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {t('benefits.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('benefits.subtitle')}
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