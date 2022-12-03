const User = require('../models/User')
const jwt = require('jsonwebtoken');
const {multipleMongooseToObject} = require('../../utils/mongoose')

class UserController {

    async findOne(req, res, next) {
        console.log("test done")
        // await User.findOne({id: req.params.id}).then(async (user) => {
        //     const data = await (user);
        //     res.send(data);
        // }).catch(next)
    }
}

module.exports = new UserController