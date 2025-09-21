import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App';
import { StaticRouter } from 'react-router-dom/server';
import HelmetAsync, {HelmetServerState} from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n';

const { HelmetProvider } = HelmetAsync;

// --- Configuration for SSG
const languages = ['ru', 'en', 'de'];
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runPrerender() {
    console.log('Starting pre-rendering process...');
    const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');

    for (const lng of languages) {
        const url = `/${lng}/`;
        console.log(`Rendering language: ${lng} for url: ${url}`);
        const translation = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, `public/locales/${lng}/translation.json`), 'utf-8')
        );

        // --- Initialize i18next for the current language IN-PROCESS
        // This is crucial for SSG. I provide the resources directly.
        await i18n.init({
            resources: {
                [lng]: {
                    translation,
                },
            },
            lng,
            fallbackLng: lng,
        });

        const helmetContext: { helmet?: HelmetServerState } = {};

        // --- Render the App component to an HTML string
        // It's wrapped with all necessary providers for routing, i18n, and head management.
        const appHtml = renderToString(
            <React.StrictMode>
                <StaticRouter location={url}>
                    <I18nextProvider i18n={i18n}>
                        <HelmetProvider context={helmetContext}>
                            <App />
                        </HelmetProvider>
                    </I18nextProvider>
                </StaticRouter>
            </React.StrictMode>
        );

        const { helmet } = helmetContext;

        // --- Inject the rendered HTML and head elements into the template
        const finalHtml = template
            .replace(`<!--app-html-->`, appHtml) // Make sure your index.html has this placeholder
            .replace(
                '</head>',
                `${helmet?.title?.toString() ?? ''}${helmet?.meta?.toString() ?? ''}${helmet?.link?.toString() ?? ''}</head>`
            );

        const dirPath = path.resolve(__dirname, `dist/${lng}`);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        const filePath = `${dirPath}/index.html`;
        fs.writeFileSync(filePath, finalHtml);
        console.log(`Successfully pre-rendered: ${filePath}`);
    }

    // --- Optional: Create a root index.html for redirection
    const rootIndexPath = path.resolve(__dirname, 'dist/index.html');
    const redirectScript = `
    <script>
      const userLang = navigator.language.split('-')[0];
      const supportedLangs = ['ru', 'en', 'de'];
      const langToRedirect = supportedLangs.includes(userLang) ? userLang : 'ru';
      window.location.replace('/' + langToRedirect + '/');
    </script>
  `;
    fs.writeFileSync(rootIndexPath, redirectScript);
    console.log('Created root redirect file.');
}

runPrerender().then(r => true);