import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ReactHelmet from 'react-helmet-async';
const { Helmet, HelmetProvider } = ReactHelmet;
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

const App = () => {
    const { t } = useTranslation();
    return (
        <HelmetProvider>
            <Helmet>
                <title>{t('meta.title')}</title>
                <meta name="description" content={t('meta.description')} />
                <meta property="og:title" content={t('meta.og_title')} />
                <meta property="og:description" content={t('meta.og_description')} />
                <meta property="og:type" content="website" />
            </Helmet>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </TooltipProvider>
            </QueryClientProvider>
        </HelmetProvider>
    );
};

export default App;