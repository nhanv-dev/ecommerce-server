const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

class AuthController {
    async register(req, res) {
        try {
            const {username, password, email} = req.body;
            const user = await User.findOne({username});
            if (user) return res.status(400).json({});
            const newUser = new User({
                username, password: CryptoJS.MD5(password).toString(),
                email
            });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async login(req, res) {
        try {
            const user = await User.findOne({username: req.body.username});
            if (!user) return res.status(401).json("Wrong credentials!");
            const hashedPassword = CryptoJS.MD5(req.body.password).toString();
            if (hashedPassword !== user.password) return res.status(401).json("Wrong credentials!");
            const accessToken = jwt.sign({_id: user._id, username: user.username}, 'RESTFULAPIs');
            return res.status(200).json({user, accessToken});
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async reLogin(req, res) {
        try {
            const {user} = req;
            const accessToken = jwt.sign({_id: user._id, username: user.username}, 'RESTFULAPIs');
            return res.status(200).json({accessToken, user});
        } catch (err) {
            res.status(500).json(err);
        }
    }

}

module.exports = new AuthController