
import Hero from "@/components/Hero";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white scroll-smooth">
      <Header />
      <Hero />
      <About />
      <Benefits />
      <Products />
      <Testimonials />
      <CTA />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
