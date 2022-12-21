function Router(app) {
    app.use('/api/v1/categories', require('./CategoryRouter'))
    app.use('/api/v1/products', require('./ProductRouter'))
    app.use('/api/v1/users', require('./UserRouter'))
    app.use('/api/v1/shops', require('./ShopRouter'))
    app.use('/api/v1/auth', require('./AuthRouter'))
    app.use('/api/v1/questions', require('./QuestionRouter'))
    app.use('/api/v1/answers', require('./AnswerRouter'))
    app.use('/api/v1/carts', require('./CartRouter'))
    app.use('/api/v1/orders', require('./OrderRouter'))
    app.use('/api/v1/evaluates', require('./EvaluateRouter'))
}

module.exports = Router
