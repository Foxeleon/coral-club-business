import App from './App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { getLanguageFromPath } from './utils/language-helper';
import './index.css';
import './i18n';

// Defining the language and the base path BEFORE rendering
const language = getLanguageFromPath(window.location.pathname);
const basename = language ? `/${language}` : '/';

ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <React.StrictMode>
        <BrowserRouter basename={basename}>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);