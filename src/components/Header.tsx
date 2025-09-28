import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Phone, Mail, Menu, UserPlus, } from "lucide-react";

// --- КОНФИГУРАЦИЯ ---
type LanguageConfig = {
  [key: string]: { name: string; flag: string };
};

const languageConfig: LanguageConfig = {
  ru: { name: "RU", flag: "🇷🇺" },
  en: { name: "EN", flag: "🇬🇧" },
};

// Приоритет элементов для скрытия. ПОРЯДОК ВАЖЕН!
// Элементы в начале массива будут скрываться первыми.
const priorityOrder = [
  "language",
  "contacts",
  "products",
  "about",
  "partnership",
  "testimonials",
  "phone-email",
];

// --- КОМПОНЕНТЫ ХЕДЕРА ---

// -- Переключатель языка --
const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
      <div className={className}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
                variant="outline"
                className="flex items-center gap-1.5 w-[70px] sm:w-24 justify-start px-2 sm:px-3"
            >
            <span className="flex-shrink-0">
              {languageConfig[currentLanguage]?.flag ?? "🌐"}
            </span>
              <span className="font-semibold hidden sm:inline">
              {languageConfig[currentLanguage]?.name ?? "Lang"}
            </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            {Object.keys(languageConfig).map((lng) => (
                <DropdownMenuItem
                    key={lng}
                    onSelect={() => changeLanguage(lng)}
                    className="cursor-pointer"
                >
                  <span className="mr-3">{languageConfig[lng].flag}</span>
                  <span>{languageConfig[lng].name}</span>
                </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  );
};

// -- Навигационные ссылки --
const NavLinks = ({ isMobile = false, onLinkClick }: { isMobile?: boolean; onLinkClick?: () => void; }) => {
  const { t } = useTranslation();
  const links = [
    { id: "testimonials", href: "#testimonials", label: t("header.nav_testimonials"), className: "hidden lg:block", },
    { id: "partnership", href: "#benefits", label: t("header.nav_partnership"), className: "hidden lg:block", },
    { id: "about", href: "#about", label: t("header.nav_about"), className: "hidden md:block", },
    { id: "products", href: "#products", label: t("header.nav_products"), className: "hidden md:block", },
    { id: "contacts", href: "#contacts", label: t("header.nav_contacts"), className: "hidden sm:block", },
  ];

  const allLinks = [
    { href: "#testimonials", label: t("header.nav_testimonials") },
    { href: "#benefits", label: t("header.nav_partnership") },
    { href: "#about", label: t("header.nav_about") },
    { href: "#products", label: t("header.nav_products") },
    { href: "#contacts", label: t("header.nav_contacts") },
  ];

  if (isMobile) {
    return (
        <nav className="flex flex-col space-y-4 text-lg">
          {allLinks.map((link) => (
              <a
                  key={link.href}
                  href={link.href}
                  onClick={onLinkClick}
                  className="text-gray-700 hover:text-teal-600 transition-colors"
              >
                {link.label}
              </a>
          ))}
        </nav>
    );
  }

  return (
      <nav className="flex items-center space-x-6">
        {links.map((link) => (
            <a key={link.id} href={link.href} className={`text-gray-700 hover:text-teal-600 transition-colors ${link.className}`}>
              {link.label}
            </a>
        ))}
      </nav>
  );
};

// -- Контакты --
const ContactInfo = ({ isMobile = false, onLinkClick }: { isMobile?: boolean; onLinkClick?: () => void; }) => (
    <div
        className={ isMobile ? "space-y-3 text-sm" : "hidden xl:flex flex-col items-start text-xs" }
    >
      <a href="mailto:info.coralworld@gmail.com" target="_blank" onClick={onLinkClick} className="flex items-center space-x-2 text-gray-600 hover:text-teal-600">
        <Mail className="w-4 h-4" />
        <span>info.coralworld@gmail.com</span>
      </a>
      <a href="tel:+4917679292954" onClick={onLinkClick} className="flex items-center space-x-2 text-gray-600 hover:text-teal-600">
        <Phone className="w-4 h-4" />
        <span>+49 176 792 929 54</span>
      </a>
    </div>
);

// -- Кнопка CTA --
const CtaButton = () => {
  const { t } = useTranslation();
  return (
      <>
        {/* Кнопка для больших экранов */}
        <a
            href="#contacts"
            className={`${buttonVariants({ size: "default", })} bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white hidden sm:inline-flex`}
        >
          {t("header.cta_button")}
        </a>
        {/* Кнопка-иконка для мобильных */}
        <a
            href="#contacts"
            className={`${buttonVariants({ size: "icon", })} bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white sm:hidden`}
        >
          <UserPlus className="h-5 w-5" />
        </a>
      </>
  );
};

// --- ОСНОВНОЙ КОМПОНЕНТ HEADER ---
const Header = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Элементы, которые будут отображаться в боковом меню
  const mobileNavItems = (
      <>
        <NavLinks isMobile onLinkClick={handleLinkClick} />
        <div className="mt-8 border-t pt-6">
          <ContactInfo isMobile onLinkClick={handleLinkClick} />
        </div>
      </>
  );

  return (
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center content-center justify-between gap-4">
            {/* Лого */}
            <a href="/" className="flex items-center space-x-3 shrink-0">
              <div className="w-14 h-14 bg-gradient-to-br from-white to-cyan-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <img src="/coral_world.svg" alt="Coral Club Logo" className="w-full h-full object-contain p-1" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">
                  CORAL CLUB BUSINESS
                </h1>
                <p className="text-[10px] md:text-xs text-gray-600">
                  {t("header.philosophy")}
                </p>
              </div>
            </a>

            <div className="flex items-center justify-center flex-grow min-w-0">
              <div className="hidden sm:flex items-center justify-center gap-x-4 md:gap-x-6">
                <NavLinks />
                <ContactInfo />
                <LanguageSwitcher className="hidden 2xl:block" />
              </div>
              <div className="ml-4 flex-shrink-0">
                <CtaButton />
              </div>

              {/* Бургер-меню появляется, когда скрыт хотя бы один элемент (кроме CTA) */}
              <div className="ml-2 2xl:hidden">
                <Sheet
                    open={isMobileMenuOpen}
                    onOpenChange={setMobileMenuOpen}
                >
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
                            <h2 className="text-lg font-bold text-gray-800">
                              CORAL CLUB
                            </h2>
                            <p className="text-xs text-gray-600">BUSINESS</p>
                          </div>
                        </a>
                      </SheetTitle>
                    </SheetHeader>
                    {mobileNavItems}
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;