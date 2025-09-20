import { renderToString } from 'react-dom/server';
import App from './App';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import React from 'react';

export function render(url: string) {
    const helmetContext: { helmet?: HelmetServerState } = {}; // Хорошая типизация
    const appHtml = renderToString(
        <React.StrictMode>
            <HelmetProvider context={helmetContext}>
                <App />
            </HelmetProvider>
        </React.StrictMode>
    );
    const { helmet } = helmetContext;
    return appHtml;
}