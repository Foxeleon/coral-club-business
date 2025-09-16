import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { render } from './entry-server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const port = process.env.PORT || 8080;

(async () => {
    const app = express();

    app.use(express.static(path.resolve(root, 'client'), { index: false }));

    app.use(async (req, res) => {
        try {
            const url = req.originalUrl;
            const template = await fs.readFile(path.resolve(root, 'client/index.html'), 'utf-8');
            const appHtml = render(url);
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);
            res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
        } catch (e) {
            console.error(e);
            res.status(500).send('Internal Server Error');
        }
    });

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})();