import fs from 'fs';
import path from 'path';
import React from 'react';
import { fileURLToPath } from 'url';
import { renderToString } from 'react-dom/server';
import App from './src/App';
import { StaticRouter } from 'react-router-dom/server';
import HelmetAsync, {HelmetServerState} from 'react-helmet-async';
const { HelmetProvider } = HelmetAsync;

async function run() {
    const routesToPrerender = ['/'];
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');

    for (const url of routesToPrerender) {
        const helmetContext: { helmet?: HelmetServerState } = {};
        const appHtml = renderToString(
            <React.StrictMode>
                <StaticRouter location={url}>
                    <HelmetProvider context={helmetContext}>
                        <App />
                    </HelmetProvider>
                </StaticRouter>
            </React.StrictMode>
        );
        const { helmet } = helmetContext;

        const finalHtml = template
            .replace(`<!--ssr-outlet-->`, appHtml)
            .replace('</head>', `${helmet?.title.toString()}${helmet?.meta.toString()}${helmet?.link.toString()}</head>`);
        const filePath = `dist${url === '/' ? '/index' : url}.html`;
        fs.writeFileSync(path.resolve(__dirname, filePath), finalHtml);
        console.log(`pre-rendered: ${filePath}`);
    }
}
run();