import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

async function createServer() {
    const app = express();
    const resolve = (p: string) => path.resolve(__dirname, p);

    let vite: any = null;
    if (!isTest) {
        vite = await (await import('vite')).createServer({
            server: { middlewareMode: true },
            appType: 'custom'
        });
        app.use(vite.middlewares);
    } else {
        app.use((await import('compression')).default());
        app.use(
            (await import('serve-static')).default(resolve('../client'), {
                index: false
            })
        );
    }

    app.use(async (req, res) => {
        try {
            const url = req.originalUrl;
            const template = isTest
                ? fs.readFileSync(resolve('../client/index.html'), 'utf-8')
                : fs.readFileSync(resolve('../index.html'), 'utf-8');

            const transformedTemplate = isTest
                ? template
                : await vite.transformIndexHtml(url, template);

            const render = isTest
                ? (await import(resolve('../server/entry-server.js'))).render
                : (await vite.ssrLoadModule('/src/entry-server.tsx')).render;

            const { html: appHtml } = await render(url);
            const html = transformedTemplate.replace(`<!--ssr-outlet-->`, appHtml);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e: any) {
            !isTest && vite.ssrFixStacktrace(e);
            console.log(e.stack);
            res.status(500).end(e.stack);
        }
    });

    return { app };
}

// Запускаем сервер только если это не тестовая среда
if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(5173, () => {
            console.log('http://localhost:5173');
        })
    );
}

// Экспортируем для использования в Amplify
export default createServer;