
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">CORAL CLUB</h1>
              <p className="text-xs text-gray-600">Философия здоровой жизни</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-teal-600 transition-colors">О компании</a>
            <a href="#products" className="text-gray-700 hover:text-teal-600 transition-colors">Продукция</a>
            <a href="#benefits" className="text-gray-700 hover:text-teal-600 transition-colors">Партнерство</a>
            <a href="#contacts" className="text-gray-700 hover:text-teal-600 transition-colors">Контакты</a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>+49 176 799 929 54</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>info.coralworld@gmail.com</span>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600">
              <a href="#contacts">Стать партнёром</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
