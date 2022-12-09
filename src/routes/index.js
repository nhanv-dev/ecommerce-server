function Router(app) {
    app.use('/api/v1/categories', require('./CategoryRouter'))
    app.use('/api/v1/products', require('./ProductRouter'))
    app.use('/api/v1/users', require('./UserRouter'))
    app.use('/api/v1/shops', require('./ShopRouter'))
    app.use('/api/v1/auth', require('./AuthRouter'))
<<<<<<< HEAD
    app.use('/api/v1/questions', require('./QuestionRouter'))
=======
    app.use('/api/v1/carts', require('./CartRouter'))

>>>>>>> 70e432de511b7250956edd2855ff6eae8c1513e5
}

module.exports = Router
