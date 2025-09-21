import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Zap, Shield } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Products = () => {
  const { t } = useTranslation();

  const products = [
    {
      icon: Leaf,
      title: t('products.product_1_title'),
      description: t('products.product_1_desc'),
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Zap,
      title: t('products.product_2_title'),
      description: t('products.product_2_desc'),
      color: "from-orange-400 to-red-500"
    },
    {
      icon: Shield,
      title: t('products.product_3_title'),
      description: t('products.product_3_desc'),
      color: "from-blue-400 to-purple-500"
    }
  ];

  return (
      <section id="products" className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {t('products.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('products.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => {
              const IconComponent = product.icon;
              return (
                  <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                      <div className={`h-32 bg-gradient-to-br ${product.color} flex items-center justify-center`}>
                        <IconComponent className="w-12 h-12 text-white group-hover:scale-125 transition-transform duration-300" />
                      </div>
                      <div className="p-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">{product.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{product.description}</p>
                      </div>
                    </CardContent>
                  </Card>
              );
            })}
          </div>
        </div>
      </section>
  );
};

export default Products;