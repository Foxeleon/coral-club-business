
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Define a type for language configuration for better type safety
type LanguageConfig = {
  [key: string]: { name: string; flag: string };
};

const languageConfig: LanguageConfig = {
  ru: { name: "RU", flag: "🇷🇺" },
  en: { name: "EN", flag: "🇬🇧" },
  de: { name: "DE", flag: "🇩🇪" },
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).then(r => true);
  };

  return (
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-14 h-14 bg-gradient-to-br from-white to-cyan-200 rounded-lg flex items-center justify-center">
                <img src="/coral_world.svg" alt="Coral Club Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">CORAL CLUB BUSINESS</h1>
                <p className="text-xs text-gray-600">{t('header.philosophy')}</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-teal-600 transition-colors">{t('header.nav_about')}</a>
              <a href="#benefits" className="text-gray-700 hover:text-teal-600 transition-colors">{t('header.nav_partnership')}</a>
              <a href="#products" className="text-gray-700 hover:text-teal-600 transition-colors">{t('header.nav_products')}</a>
              <a href="#testimonials" className="text-gray-700 hover:text-teal-600 transition-colors">{t('header.nav_testimonials')}</a>
              <a href="#contacts" className="text-gray-700 hover:text-teal-600 transition-colors">{t('header.nav_contacts')}</a>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span><a href="tel:+4917679292954">+49 176 792 929 54</a></span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span><a href="mailto:info.coralworld@gmail.com" target="_blank">info.coralworld@gmail.com</a></span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600">
                <a href="#contacts">{t('header.cta_button')}</a>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 w-24 justify-start">
                    <span className="flex-shrink-0">{languageConfig[currentLanguage]?.flag ?? '🌐'}</span>
                    <span className="font-semibold">{languageConfig[currentLanguage]?.name ?? 'Lang'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  {Object.keys(languageConfig).map((lng) => (
                      <DropdownMenuItem key={lng} onSelect={() => changeLanguage(lng)} className="cursor-pointer">
                        <span className="mr-3">{languageConfig[lng].flag}</span>
                        <span>{languageConfig[lng].name}</span>
                      </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
  );
};
export default Header;
