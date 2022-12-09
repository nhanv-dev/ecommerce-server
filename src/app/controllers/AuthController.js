const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../../config/email");
const randomstring = require("randomstring");
const Mailer = require("../../utils/mailer");

class AuthController {
    async register(req, res) {
        try {
            const {firstName, lastName, username, password, email} = req.body;
            const user = await User.findOne({username});
            if (user) return res.status(400).json({success: false, message: "User isExist in Db"});
            const token = randomstring.generate();
            const newUser = new User({
                firstName, lastName, username, password: CryptoJS.MD5(password).toString(), email, token: token
            });
            const savedUser = await newUser.save();
            await Mailer.activeAccount(username, email, token);
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


}

module.exports = new AuthController