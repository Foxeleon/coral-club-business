import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import i18n from './src/i18n';

const languages = ['ru', 'en', 'de'];
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runPrerender() {
    console.log('Starting BULLETPROOF pre-rendering process...');

    const templatePath = path.resolve(__dirname, 'dist/client/index.html');
    if (!fs.existsSync(templatePath)) {
        console.error("PANIC: dist/client/index.html not found. Check build:client script.");
        return;
    }
    const template = fs.readFileSync(templatePath, 'utf-8');

    const serverEntryPath = path.resolve(__dirname, 'dist/server/entry-server.js');
    if (!fs.existsSync(serverEntryPath)) {
        console.error("PANIC: dist/server/entry-server.js not found. Check build:server script.");
        return;
    }
    const { render } = await import(serverEntryPath);

    for (const lng of languages) {
        console.log(`Rendering language: ${lng}`);

        const translation = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, `public/locales/${lng}/translation.json`), 'utf-8')
        );

        await i18n.init({
            resources: { [lng]: { translation } },
            lng,
            fallbackLng: lng,
        });

        const { html: appHtml, helmet } = render('/', i18n);

        const helmetStrings = `
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
        `;

        const finalHtml = template
            .replace(`<!--app-html-->`, appHtml)
            .replace('</head>', `${helmetStrings}</head>`);

        const dirPath = path.resolve(__dirname, `dist/client/${lng}`);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFileSync(`${dirPath}/index.html`, finalHtml);
        console.log(`Successfully pre-rendered: dist/client/${lng}/index.html`);
    }

    const rootIndexPath = path.resolve(__dirname, 'dist/client/index.html');
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