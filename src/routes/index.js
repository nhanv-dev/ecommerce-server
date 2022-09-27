
function Router(app) {
    app.use('/api/v1/categories', require('./CategoryRouter'))
    app.use('/api/v1/products', require('./ProductRouter'))
    app.use('/api/v1/users', require('./UserRouter'))
    app.use('/api/v1/sellers', require('./UserRouter'))
}

module.exports = Router
