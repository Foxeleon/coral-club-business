
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-500 via-cyan-400 to-emerald-500 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готовы начать?
            </h2>
            <p className="text-xl mb-8 text-teal-50 leading-relaxed">
              Не упустите шанс стать частью успешного бизнеса, основанного на реальных результатах! 
              Присоединитесь к Coral Club сегодня!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <span className="text-teal-50">Зарегистрируйтесь в качестве члена клуба</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">2</span>
                </div>
                <span className="text-teal-50">Пройдите обучение для партнёров</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">3</span>
                </div>
                <span className="text-teal-50">Начните строить бизнес прямо сейчас</span>
              </div>
            </div>
          </div>

          <Card className="shadow-2xl border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Стать партнёром
              </h3>
              <form className="space-y-6">
                <div>
                  <Input 
                    placeholder="Ваше имя" 
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email адрес" 
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <Input 
                    type="tel" 
                    placeholder="Номер телефона" 
                    className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 py-3 text-lg">
                  Получить консультацию
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-teal-500" />
                    <span>+49 176 799 929 54</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-teal-500" />
                    <span>info.coralworld@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-teal-500" />
                    <span>Telegram: @coralworld_eu</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTA;
