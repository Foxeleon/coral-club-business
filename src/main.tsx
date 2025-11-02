import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { getLanguageFromPath } from './utils/language-helper';
import './index.css';
import './i18n';
import { HelmetProvider } from "react-helmet-async";

const language = getLanguageFromPath(window.location.pathname);
const basename = language ? `/${language}` : '/';
const rootElement = document.getElementById('root') as HTMLElement;

const app = (
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter basename={basename}>
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>
);

// Conditional rendering
// import.meta.env.DEV is a special Vite variable that is set to true in development mode.
if (import.meta.env.DEV) {
    // In development mode, we use createRoot for rendering from scratch.
    const root = ReactDOM.createRoot(rootElement);
    root.render(app);
} else {
    // In production mode (after build), we use hydrateRoot to "animate" SSG content.
    ReactDOM.hydrateRoot(rootElement, app);
}