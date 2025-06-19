
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">CORAL CLUB</h3>
                <p className="text-sm text-gray-400">Философия здоровой жизни</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Более 20 лет мы помогаем людям улучшить качество жизни через доступ к качественным 
              продуктам для здоровья и современным технологиям.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Продукция</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Партнерство</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Отзывы</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li>+49 176 799 929 54</li>
              <li>info.coralworld@gmail.com</li>
              <li>Telegram: @coralworld_eu</li>
              <li>WhatsApp доступен</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-1">
            <span>Сделано с</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>для здоровья и успеха</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
