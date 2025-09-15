import fs from 'fs';
import path from 'path';
import express from 'express';
import { ViteDevServer } from 'vite';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

export default async function createServer(projectRoot: string = process.cwd()) {
    const app = express();
    const resolve = (p: string) => path.resolve(projectRoot, p);

    let vite: ViteDevServer | null = null;

    if (!isTest) {
        vite = await (await import('vite')).createServer({
            server: { middlewareMode: true },
            appType: 'custom',
            root: projectRoot,
        });
        app.use(vite.middlewares);
    } else {
        app.use((await import('compression')).default());
        app.use(express.static(resolve('dist/client'), { index: false }));
    }

    app.use(async (req, res) => {
        try {
            const url = req.originalUrl;

            const templatePath = isTest ? resolve('dist/client/index.html') : resolve('index.html');
            const template = fs.readFileSync(templatePath, 'utf-8');

            const transformedTemplate = isTest
                ? template
                : await vite!.transformIndexHtml(url, template);

            let render;
            if (isTest) {
                const serverEntryPath = new URL('./dist/server/entry-server.js', `file://${projectRoot}/`).href;
                render = (await import(serverEntryPath)).render;
            } else {
                render = (await vite!.ssrLoadModule('/src/entry-server.tsx')).render;
            }

            const { html: appHtml } = await render(url);
            const html = transformedTemplate.replace(`<!--ssr-outlet-->`, appHtml);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e: any) {
            if (vite) vite.ssrFixStacktrace(e);
            console.error(e.stack);
            res.status(500).end(e.stack);
        }
    });

    return { app };
}

if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(5173, () => {
            console.log('http://localhost:5173');
        })
    );
}