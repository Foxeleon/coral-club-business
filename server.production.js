import createServer from './dist/server/server.js';

process.env.NODE_ENV = 'test';
const projectRoot = process.cwd();

createServer(projectRoot).then(({ app }) => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});