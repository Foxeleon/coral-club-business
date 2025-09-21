import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Globe, Heart } from "lucide-react";
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  // I've moved the data into the component itself.
  // This makes it easier to manage translations.
  const achievements = [
    {
      icon: Award,
      title: t('about.achievement_1_title'),
      description: t('about.achievement_1_desc')
    },
    {
      icon: Users,
      title: t('about.achievement_2_title'),
      description: t('about.achievement_2_desc')
    },
    {
      icon: Globe,
      title: t('about.achievement_3_title'),
      description: t('about.achievement_3_desc')
    },
    {
      icon: Heart,
      title: t('about.achievement_4_title'),
      description: t('about.achievement_4_desc')
    }
  ];

  const values = [
    t('about.value_1'),
    t('about.value_2'),
    t('about.value_3'),
    t('about.value_4'),
  ];

  return (
      <section id="about" className="py-20 bg-gradient-to-br from-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {t('about.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                {t('about.mission_title')}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t('about.mission_text_1')}
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t('about.mission_text_2')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{t('about.values_title')}</h3>
              <ul className="space-y-4">
                {values.map((value, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <span>{value}</span>
                    </li>
                ))}
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