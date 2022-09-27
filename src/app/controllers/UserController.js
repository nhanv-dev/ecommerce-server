const User = require('../models/User')
const {multipleMongooseToObject} = require('../../utils/mongoose')

class UserController {
    async findOne(req, res, next) {
        await User.findOne({id: req.params.id}).then(async (user) => {
            const data = await multipleMongooseToObject(user);
            res.send(data);
        }).catch(next)
    }
}

module.exports = new UserController