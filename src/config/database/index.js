const {connect: mongooseConnect} = require('mongoose')
const constant = require('../../constant')

async function connect() {
    try {
        const db = await mongooseConnect(constant.URL_DB, constant.OPTIONS)
        console.log('Database connected')
    } catch (error) {
        console.log('Database connected failed', error)
    }
}

module.exports = {connect}