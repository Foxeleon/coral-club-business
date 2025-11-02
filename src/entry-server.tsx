import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import App from './App';

interface IRenderResult {
    html: string;
    helmet: HelmetServerState;
}

export function render(url: string, i18nInstance: any): IRenderResult {
    const helmetContext: { helmet?: HelmetServerState } = {};

    const html = ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouter location={url}>
                <HelmetProvider context={helmetContext}>
                    <I18nextProvider i18n={i18nInstance}>
                        <App />
                    </I18nextProvider>
                </HelmetProvider>
            </StaticRouter>
        </React.StrictMode>
    );

    return { html, helmet: helmetContext.helmet! };
}