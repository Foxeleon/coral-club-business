
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Header />
      <Hero />
      <Benefits />
      <Products />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
