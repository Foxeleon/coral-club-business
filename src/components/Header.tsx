import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Phone, Mail, Menu } from "lucide-react";

type LanguageConfig = {
  [key: string]: { name: string; flag: string };
};

const languageConfig: LanguageConfig = {
  ru: { name: "RU", flag: "🇷🇺" },
  en: { name: "EN", flag: "🇬🇧" },
};

const NavLinks = ({ onLinkClick, inSheet = false }: { onLinkClick?: () => void, inSheet?: boolean }) => {
  const { t } = useTranslation();

  const baseLinkClass = "text-gray-700 hover:text-teal-600 transition-colors";
  const sheetLinkClass = "text-lg";

  const links = [
    { href: "#products", label: t('header.nav_products'), className: "hidden 2xl:block" },
    { href: "#about", label: t('header.nav_about'), className: "hidden xl:block" },
    { href: "#contacts", label: t('header.nav_contacts'), className: "hidden xl:block" },
    { href: "#benefits", label: t('header.nav_partnership'), className: "hidden lg:block" },
    { href: "#testimonials", label: t('header.nav_testimonials'), className: "hidden md:block" },
  ];

  const allLinksForSheet = [
    { href: "#products", label: t('header.nav_products') },
    { href: "#about", label: t('header.nav_about') },
    { href: "#contacts", label: t('header.nav_contacts') },
    { href: "#benefits", label: t('header.nav_partnership') },
    { href: "#testimonials", label: t('header.nav_testimonials') },
  ];

  if (inSheet) {
    return (
        <nav className="flex flex-col space-y-4">
          {allLinksForSheet.map(link => (
              <a key={link.href} href={link.href} onClick={onLinkClick} className={`${baseLinkClass} ${sheetLinkClass}`}>
                {link.label}
              </a>
          ))}
        </nav>
    );
  }

  return (
      <nav className="hidden md:flex items-center space-x-6">
        {links.map(link => (
            <a key={link.href} href={link.href} onClick={onLinkClick} className={`${baseLinkClass} ${link.className}`}>
              {link.label}
            </a>
        ))}
      </nav>
  );
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center shrink-0">
              <div className="md:hidden mr-2">
                <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                    <SheetHeader className="border-b pb-4 mb-4">
                      <SheetTitle>
                        <a href="/" onClick={handleLinkClick} className="flex items-center space-x-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-white to-cyan-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img src="/coral_world.svg" alt="Coral Club Logo" className="w-full h-full object-contain p-1" />
                          </div>
                          <div>
                            <h2 className="text-lg font-bold text-gray-800">CORAL CLUB</h2>
                            <p className="text-xs text-gray-600">BUSINESS</p>
                          </div>
                        </a>
                      </SheetTitle>
                    </SheetHeader>

                    <NavLinks inSheet onLinkClick={handleLinkClick} />

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
                      <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600" asChild>
                        <a href="#contacts" onClick={handleLinkClick}>{t('header.cta_button')}</a>
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <a href="/" className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-br from-white to-cyan-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src="/coral_world.svg" alt="Coral Club Logo" className="w-full h-full object-contain p-1" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">CORAL CLUB BUSINESS</h1>
                  <p className="text-[10px] md:text-xs text-gray-600">{t('header.philosophy')}</p>
                </div>
              </a>
            </div>

            <NavLinks />

            <div className="flex items-center justify-end space-x-2 md:space-x-4">
              <div className="hidden lg:flex flex-col items-start text-xs text-gray-600">
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