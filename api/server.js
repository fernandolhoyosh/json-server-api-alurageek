// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server');
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(cors('*'));

server.get('/productos', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/product/:resource/:id/show': '/:resource/:id'
}))
server.use(router)

server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server