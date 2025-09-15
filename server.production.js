import createServer from './dist/server/server.js';

process.env.NODE_ENV = 'test';

createServer().then(({ app }) => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});