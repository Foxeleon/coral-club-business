import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
  const { t } = useTranslation();

  // Using a number in the key makes it easy to loop through if needed.
  const testimonials = [
    {
      name: t('testimonials.testimonial_1_name'),
      text: t('testimonials.testimonial_1_text'),
      role: t('testimonials.testimonial_1_role')
    },
    {
      name: t('testimonials.testimonial_2_name'),
      text: t('testimonials.testimonial_2_text'),
      role: t('testimonials.testimonial_2_role')
    },
    {
      name: t('testimonials.testimonial_3_name'),
      text: t('testimonials.testimonial_3_text'),
      role: t('testimonials.testimonial_3_role')
    },
    {
      name: t('testimonials.testimonial_4_name'),
      text: t('testimonials.testimonial_4_text'),
      role: t('testimonials.testimonial_4_role')
    },
    {
      name: t('testimonials.testimonial_5_name'),
      text: t('testimonials.testimonial_5_text'),
      role: t('testimonials.testimonial_5_role')
    },
    {
      name: t('testimonials.testimonial_6_name'),
      text: t('testimonials.testimonial_6_text'),
      role: t('testimonials.testimonial_6_role')
    },
  ];

  return (
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('testimonials.subtitle')}
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