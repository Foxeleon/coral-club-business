import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response, NextFunction } from 'express';
import { ViteDevServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createServer = async () => {
    const app = express();

    // Создаем Vite-сервер в режиме middleware
    const vite: ViteDevServer = await (await import('vite')).createServer({
        server: { middlewareMode: true },
        appType: 'custom'
    });

    // Используем middleware от Vite для HMR
    app.use(vite.middlewares);

    app.use('*', async (req: Request, res: Response, next: NextFunction) => {
        const url = req.originalUrl;

        try {
            // 1. Читаем index.html как шаблон
            let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

            // 2. Трансформируем HTML с помощью Vite
            template = await vite.transformIndexHtml(url, template);

            // 3. Загружаем серверную точку входа
            const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

            // 4. Рендерим приложение
            const { html: appHtml } = await render(url);

            // 5. Вставляем HTML приложения в шаблон
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);

            // 6. Отправляем финальный HTML
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            if (e instanceof Error) {
                vite.ssrFixStacktrace(e);
            }
            next(e);
        }
    });

    const port = 5173;
    app.listen(port, () => {
        console.log(`SSR Server is running at http://localhost:${port}`);
    });
};

createServer();