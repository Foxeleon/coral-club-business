import { Button } from "@/components/ui/button";
import { ArrowRight, Droplets } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-cyan-300 to-emerald-400">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="absolute top-20 left-10 animate-bounce">
          <Droplets className="w-8 h-8 text-white/30" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce delay-300">
          <Droplets className="w-6 h-6 text-white/30" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-700">
          <Droplets className="w-10 h-10 text-white/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('hero.main_title_1')}{' '}
              <span className="block bg-gradient-to-r from-green-600 to-orange-300 bg-clip-text text-transparent">
              {t('hero.main_title_2')}
            </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-teal-50 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <a href="#contacts">{t('hero.cta_button_1')}</a>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">{t('hero.stat_1_title')}</h3>
                <p className="text-teal-50">{t('hero.stat_1_desc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">{t('hero.stat_2_title')}</h3>
                <p className="text-teal-50">{t('hero.stat_2_desc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-2xl font-bold mb-2">{t('hero.stat_3_title')}</h3>
                <p className="text-teal-50">{t('hero.stat_3_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Hero;