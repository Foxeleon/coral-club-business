import { Heart } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

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
                  <h3 className="text-xl font-bold">CORAL CLUB BUSINESS</h3>
                  <p className="text-sm text-gray-400">{t('footer.philosophy')}</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                {t('footer.description')}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.company_title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">{t('footer.company_link_1')}</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">{t('footer.company_link_2')}</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">{t('footer.company_link_3')}</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">{t('footer.company_link_4')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.contacts_title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="tel:+4915560591305">+49 155 605 913 05</a></li>
                <li><a href="mailto:info.coralworld@gmail.com" target="_blank">info.coralworld@gmail.com</a></li>
                <li>Telegram: <a href='https://t.me/+4917679292954' target="_blank">@CoralWorldInfo</a></li>
                <li><a href="https://wa.me/+4917679292954" target="_blank">WhatsApp</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 flex items-center justify-center space-x-1">
              <span>{t('footer.made_with')}</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>{t('footer.for_health')}</span>
            </p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;