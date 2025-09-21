import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    // This is a backend to load translations from a server.
    // use it on the client-side to fetch json files.
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // I'll provide translations directly during SSG.
        // For client-side, it will fetch them.
        fallbackLng: 'ru', // use ru if detected lng is not available
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    }).then(r => true);

export default i18n;