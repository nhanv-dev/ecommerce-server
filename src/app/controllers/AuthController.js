const User = require('../models/User');
const Shop = require('../models/Shop');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../../config/email");
const Mailer = require("../../utils/mailer");
const {mongooseToObject} = require("../../utils/mongoose");


class AuthController {

    async register(req, res) {
        try {
            const {fullName, username, password, email} = req.body;
            console.log(fullName, username, password, email)
            const isExist = await User.findOne({username});
            if (isExist) return res.status(400).json({success: false, message: "Username already exist"});
            const newUser = new User({fullName, username, password: CryptoJS.MD5(password).toString(), email});
            const savedUser = await newUser.save();
            const token = Math.floor(Math.random() * (999999 - 111111)) + 111111;
            await User.updateOne({_id: savedUser._id.toString()}, {$set: {token: token}});
            await Mailer.sendConfirmCode(savedUser.username, savedUser.email, token);
            res.status(200).json({success: true, user: {'id': savedUser._id.toString(), token}});
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async validateRegister(req, res) {
        try {
            const {token, id} = req.body;
            console.log(token, id)
            const user = await User.findOne({_id: id});
            console.log(user)
            if (!user) return res.status(200).json({success: false});
            await User.updateOne({_id: id}, {$set: {isActive: true}});

            return res.status(200).json({success: true, user: await User.findOne({token, _id: id})});
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async registerShop(req, res) {
        try {
            console.log(req.body, req.user)
            // const {_id} = req.user;
            // const isExist = await User.findOne({_id});
            // if (!isExist) return res.status(400).json({success: false, message: "Username already exist"});
            // const data = new Shop({...req.body});
            // const shop = await data.save();
            res.status(200).json({success: true, user: null});
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async login(req, res) {
        try {
            const user = await mongooseToObject(await User.findOne({username: req.body.username}));
            if (!user) return res.status(401).json("Wrong credentials!");
            const hashedPassword = CryptoJS.MD5(req.body.password).toString();
            if (hashedPassword !== user.password) return res.status(401).json("Wrong credentials!");
            const payload = {
                user: {
                    _id: user._id,
                    username: user.username,
                    fullName: user.fullName,
                    avatar: user.avatar,
                    email: user.email,
                    isShop: user.isShop,
                    isAdmin: user.isAdmin,
                }
            };
            let accessToken = jwt.sign({
                ...payload.user,
                shopId: payload?.shop?._id
            }, 'RESTFULAPIs', {expiresIn: '2h'});

            if (user.isShop) {
                const shop = await mongooseToObject(await Shop.findByAccountId(payload.user._id));
                if (shop) payload.shop = shop
                accessToken = jwt.sign({
                    ...payload.user,
                    shopId: payload?.shop?._id
                }, 'RESTFULAPIs', {expiresIn: '2h'});
                return res.status(200).json({
                    accessToken,
                    user: {...payload.user},
                    shop: {...payload.shop}
                });
            }
            return res.status(200).json({
                accessToken,
                user: {...payload.user},
            });
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async reLogin(req, res) {
        try {
            const payload = {user: {...req.user}};
            if (req.user.isShop) {
                const shop = await mongooseToObject(await Shop.findByAccountId(payload.user._id));
                if (shop) payload.shop = shop
            }
            return res.status(200).json({accessToken: req.token, user: {...payload.user}, shop: {...payload.shop}});
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async checkInvalidToken(req, res) {
        try {
            const {user, token} = req;
            const payload = {user, token}
            if (user.isShop) {
                const shop = await mongooseToObject(await Shop.findByAccountId(payload.user._id));
                if (shop) payload.shop = shop
                return res.status(200).json({
                    accessToken: payload.token,
                    user: {...payload.user},
                    shop: {...payload.shop}
                });
            }
            return res.status(200).json({accessToken: req.token, user: req.user});
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }
}

module.exports = new AuthController