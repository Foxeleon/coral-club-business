import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Phone, Mail, Menu, X } from "lucide-react";

// Тип для конфигурации языков для лучшей безопасности типов
type LanguageConfig = {
  [key: string]: { name: string; flag: string };
};

const languageConfig: LanguageConfig = {
  ru: { name: "RU", flag: "🇷🇺" },
  en: { name: "EN", flag: "🇬🇧" },
  de: { name: "DE", flag: "🇩🇪" },
};

// Компонент для навигационных ссылок, чтобы избежать дублирования кода
const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const { t } = useTranslation();
  const links = [
    { href: "#products", label: t('header.nav_products'), className: "hidden 2xl:block" },
    { href: "#about", label: t('header.nav_about'), className: "hidden xl:block" },
    { href: "#contacts", label: t('header.nav_contacts'), className: "hidden lg:block" },
    { href: "#benefits", label: t('header.nav_partnership'), className: "hidden lg:block" },
    { href: "#testimonials", label: t('header.nav_testimonials'), className: "hidden md:block" },
  ];

  return (
      <>
        {links.map(link => (
            <a key={link.href} href={link.href} onClick={onLinkClick} className={`text-gray-700 hover:text-teal-600 transition-colors ${link.className}`}>
              {link.label}
            </a>
        ))}
        {/* Эти ссылки будут видны на десктопе всегда, пока не включится мобильное меню */}
        <a href="#testimonials" onClick={onLinkClick} className="text-gray-700 hover:text-teal-600 transition-colors hidden md:block lg:hidden">{t('header.nav_testimonials')}</a>
        <a href="#benefits" onClick={onLinkClick} className="text-gray-700 hover:text-teal-600 transition-colors hidden md:block xl:hidden lg:hidden">{t('header.nav_partnership')}</a>
        <a href="#contacts" onClick={onLinkClick} className="text-gray-700 hover:text-teal-600 transition-colors hidden md:block 2xl:hidden xl:hidden">{t('header.nav_contacts')}</a>
      </>
  );
};


const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setMobileMenuOpen(false); // Закрываем меню при смене языка
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false); // Закрываем меню при клике на ссылку
  };

  return (
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">

            {/* Левая сторона: Бургер-меню (только на мобильных) и Логотип */}
            <div className="flex items-center space-x-4">
              {/* Бургер-меню */}
              <div className="lg:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                    <SheetHeader className="border-b pb-4 mb-4">
                      <SheetTitle className="flex items-center space-x-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-white to-cyan-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img src="/coral_world.svg" alt="Coral Club Logo" className="w-full h-full object-contain p-1" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-800">CORAL CLUB BUSINESS</h2>
                          <p className="text-xs text-gray-600">{t('header.philosophy')}</p>
                        </div>
                      </SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col space-y-4 text-lg">
                      <a href="#about" onClick={handleLinkClick} className="text-gray-700 hover:text-teal-600 transition-colors">{t('header.nav_about')}</a>
                      <a href="#products" onClick={handleLinkClick} className="text-gray-700 hover:text-teal-600 transition-colors">{t('header.nav_products')}</a>
                      <a href="#benefits" onClick={handleLinkClick} className="text-gray-700 hover:text-teal-600 transition-colors">{t('header.nav_partnership')}</a>
                      <a href="#testimonials" onClick={handleLinkClick} className="text-gray-700 hover:text-teal-600 transition-colors">{t('header.nav_testimonials')}</a>
                      <a href="#contacts" onClick={handleLinkClick} className="text-gray-700 hover:text-teal-600 transition-colors">{t('header.nav_contacts')}</a>
                    </nav>
                    <div className="mt-8 border-t pt-6 space-y-6">
                      <div className="text-sm text-gray-600 space-y-3">
                        <a href="mailto:info.coralworld@gmail.com" target="_blank" className="flex items-center space-x-2 hover:text-teal-600">
                          <Mail className="w-4 h-4" />
                          <span>info.coralworld@gmail.com</span>
                        </a>
                        <a href="tel:+4917679292954" className="flex items-center space-x-2 hover:text-teal-600">
                          <Phone className="w-4 h-4" />
                          <span>+49 176 792 929 54</span>
                        </a>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600" onClick={handleLinkClick} asChild>
                        <a href="#contacts">{t('header.cta_button')}</a>
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Логотип */}
              <a href="/" className="flex items-center space-x-2">
                <div className="w-14 h-14 bg-gradient-to-br from-white to-cyan-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src="/coral_world.svg" alt="Coral Club Logo" className="w-full h-full object-contain p-1" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-800">CORAL CLUB BUSINESS</h1>
                  <p className="text-xs text-gray-600">{t('header.philosophy')}</p>
                </div>
              </a>
            </div>

            {/* Центральная навигация (только на десктопе) */}
            <nav className="hidden lg:flex items-center space-x-6">
              <NavLinks />
            </nav>

            {/* Правая сторона: Контакты, Кнопка, Язык */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="hidden xl:flex flex-col items-center text-xs text-gray-600">
                <a href="mailto:info.coralworld@gmail.com" target="_blank" className="flex items-center space-x-1 hover:text-teal-600">
                  <Mail className="w-3 h-3" />
                  <span>info.coralworld@gmail.com</span>
                </a>
                <a href="tel:+4917679292954" className="flex items-center space-x-1 hover:text-teal-600">
                  <Phone className="w-3 h-3" />
                  <span>+49 176 792 929 54</span>
                </a>
              </div>

              <Button className="hidden md:inline-flex bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600" asChild>
                <a href="#contacts">{t('header.cta_button')}</a>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1.5 w-[70px] sm:w-24 justify-start px-2 sm:px-3">
                    <span className="flex-shrink-0">{languageConfig[currentLanguage]?.flag ?? '🌐'}</span>
                    <span className="font-semibold hidden sm:inline">{languageConfig[currentLanguage]?.name ?? 'Lang'}</span>
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