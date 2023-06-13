const {connect: mongooseConnect} = require('mongoose')
const constant = require('../../constant')

function connect() {
    try {
        mongooseConnect(constant.URL_DB, constant.OPTIONS)
        console.log('Database connected')
    } catch (error) {
        console.log('Database connected failed', error)
    }
}

module.exports = {connect}