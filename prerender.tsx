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

const languages = ['ru', 'en', 'de'];
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runPrerender() {
    console.log('Starting simplified pre-rendering process...');

    const templatePath = path.resolve(__dirname, 'dist/index.html');
    if (!fs.existsSync(templatePath)) {
        console.error("Error: dist/index.html not found. Did you run 'npm run build' first?");
        return;
    }
    const template = fs.readFileSync(templatePath, 'utf-8');

    for (const lng of languages) {
        console.log(`Rendering language: ${lng}`);

        const translation = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, `public/locales/${lng}/translation.json`), 'utf-8')
        );

        // I initialize i18next with the specific language
        await i18n.init({
            resources: { [lng]: { translation } },
            lng,
            fallbackLng: lng,
        });

        const helmetContext: { helmet?: HelmetServerState } = {};

        // React Router will handle the root path, and i18next already knows the language
        const appHtml = renderToString(
            <React.StrictMode>
                <StaticRouter location="/">
                    <I18nextProvider i18n={i18n}>
                        <HelmetProvider context={helmetContext}>
                            <App />
                        </HelmetProvider>
                    </I18nextProvider>
                </StaticRouter>
            </React.StrictMode>
        );

        const { helmet } = helmetContext;

        const finalHtml = template
            .replace(`<!--app-html-->`, appHtml)
            .replace(
                '</head>',
                `${helmet?.title?.toString() ?? ''}${helmet?.meta?.toString() ?? ''}${helmet?.link?.toString() ?? ''}</head>`
            );

        const dirPath = path.resolve(__dirname, `dist/${lng}`);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(`${dirPath}/index.html`, finalHtml);
        console.log(`Successfully pre-rendered: dist/${lng}/index.html`);
    }

    // Create the root redirect
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
    console.log('\nSSG process completed successfully!');
}

runPrerender().then(r => true);