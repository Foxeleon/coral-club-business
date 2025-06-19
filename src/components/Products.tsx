
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Zap, Shield } from "lucide-react";

const Products = () => {
  const products = [
    {
      icon: Leaf,
      title: "Программы детокса",
      description: "Коло-Вада и Корал Детокс для очищения организма",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Витаминно-минеральные комплексы",
      description: "Полноценное питание для активной жизни",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: Shield,
      title: "Иммунная защита",
      description: "Парашилд Плюс и Иммунити Пэк для крепкого здоровья",
      color: "from-blue-400 to-purple-500"
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Продукция для полноценной жизни
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ассортимент качественных решений для здоровья с натуральными компонентами
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
