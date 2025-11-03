import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Phone, Mail, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from 'react-i18next';

const CTA = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<{
    isSubmitting: boolean;
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({
    isSubmitting: false,
    type: 'idle',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setStatus({ isSubmitting: false, type: 'error', message: t('cta.status_fill_fields') });
      return;
    }

    setStatus({ isSubmitting: true, type: 'idle', message: '' });

    try {
      const requestBody = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || ' ',
      };

      const apiUrl = import.meta.env.VITE_PUBLIC_API_URL;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `${t('cta.status_error_prefix')}: ${response.status}`);
      }

      setStatus({ isSubmitting: false, type: 'success', message: t('cta.status_success') });
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setStatus({ isSubmitting: false, type: 'idle', message: '' }), 5000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('cta.status_unknown_error');
      setStatus({ isSubmitting: false, type: 'error', message: errorMessage });
    }
  };

  return (
      <section id="contacts" className="py-20 bg-gradient-to-br from-teal-500 via-cyan-400 to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-xl mb-8 text-teal-50 leading-relaxed">
                {t('cta.subtitle')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <span className="text-teal-50">{t('cta.step_1')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <span className="text-teal-50">{t('cta.step_2')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <span className="text-teal-50">{t('cta.step_3')}</span>
                </div>
              </div>
            </div>
            <Card className="shadow-2xl border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {t('cta.form_title')}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t('cta.form_name_placeholder')}
                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        disabled={status.isSubmitting}
                        required
                    />
                  </div>
                  <div>
                    <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t('cta.form_email_placeholder')}
                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        disabled={status.isSubmitting}
                        required
                    />
                  </div>
                  <div>
                    <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('cta.form_phone_placeholder')}
                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        disabled={status.isSubmitting}
                        required
                    />
                  </div>

                  <div>
                    <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t('cta.form_message_placeholder')}
                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        disabled={status.isSubmitting}
                        rows={4}
                    />
                  </div>

                  <div className="h-10" style={status.type === 'idle' ? { display: 'none' } : {}}>
                    {status.type === 'success' && (
                        <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg text-sm">
                          <CheckCircle className="w-5 h-5" />
                          <span>{status.message}</span>
                        </div>
                    )}
                    {status.type === 'error' && (
                        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                          <AlertCircle className="w-5 h-5" />
                          <span>{status.message}</span>
                        </div>
                    )}
                  </div>

                  <Button
                      type="submit"
                      disabled={status.isSubmitting}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                          {t('cta.form_button_submitting')}
                        </>
                    ) : (
                        <>
                          {t('cta.form_button_default')}
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                    )}
                  </Button>
                </form>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-teal-500" />
                      <span><a href="tel:+4915560591305">+49 155 605 913 05</a></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-teal-500" />
                      <span><a href="mailto:info.coralworld@gmail.com" target="_blank">info.coralworld@gmail.com</a></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-teal-500" />
                      <span>Telegram: <a href='https://t.me/+4917679292954' target="_blank">@CoralWorldInfo</a></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-teal-500" />
                      <span>WhatsApp: <a href="https://wa.me/+4917679292954" target="_blank">WhatsApp</a></span>
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