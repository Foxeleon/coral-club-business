import App from './App.tsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './i18n'; // This will import and run the i18n configuration

ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <React.StrictMode>
        <BrowserRouter>
            {/*
                The I18nextProvider is now wrapped around App in the prerender.tsx for SSG
                and on the client-side, the init in i18n.ts will handle everything.
                I don't need to wrap it here again.
            */}
            <App />
        </BrowserRouter>
    </React.StrictMode>
);