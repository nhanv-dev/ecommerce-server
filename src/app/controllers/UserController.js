const User = require('../models/User')
const UserAddress = require('../models/UserAddress')
const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose')
const Category = require("../models/Category");
const jwt = require('jsonwebtoken');
const config = require("../../config/email");
const nodeMailer = require("nodemailer");
const randomString = require('randomstring');
const Mailer = require("../../utils/mailer");


class UserController {

    async create(req, res) {
        try {
            // const user = await User.createUser({...req.body});
            const user = await User.createUser(userExample);
            return res.status(200).json({success: true, user});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async update(req, res) {
        try {
            const {firstName, lastName, email, password} = req.body;
            const user = await User.updateUser(firstName, lastName, email, password);
            // return res.status(200).json({success: true, user: {...user, password: null}});
            return res.status(200).json({success: true});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findInformation(req, res) {
        try {
            const user = await User.findOne({id: req.user._id})
            return res.status(200).json({success: true, user});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async registerAccount(req, res) {
        try {
            const {firstName, lastName, email, username, password} = req.body;
            const token = randomstring.generate();
            await User.createUser(firstName, lastName, username, password, email);
            await User.updateOne({email: email}, {$set: {token: token}});
            await Mailer.activeAccount(username, email, token);
            return res.status(200).json({success: true});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async activeAccount(req, res) {
        try {
            const {token, userId} = req.body;
            const user = await mongooseToObject(await User.findOne({_id: userId}));
            if (!user) return res.status(200).json({success: false, message: "User not exist in Database"});
            if (user.isActive) return res.status(200).json({success: false, message: "Account activated"});
            const diff = Math.abs(new Date().getTime() - user.createdAt.getTime()) / 3600000;
            if (diff > 1) return res.status(200).json({success: false, message: "Authentication timeout"});
            if (parseInt(user.token) === parseInt(token)) {
                await User.updateOne({email: user.email}, {$set: {token: "", isActive: true}});
                return res.status(200).json({success: true, message: "Successfully account activated"});
            }
            return res.status(200).json({success: false, message: "Fail account activated"});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async forgetPassword(req, res) {
        try {
            const {email} = req.body;
            if (!email) return res.status(200).json({success: false, message: "Email not empty"});
            const user = await User.findOne({email});
            if (!user) {
                return res.status(200).json({success: false, message: "Email not exist"});
            } else {
                const confirmCode = Math.floor(Math.random() * (999999 - 111111)) + 111111;
                await Mailer.sendConfirmCode(user.username, user.email, confirmCode);
                await User.updateOne({email: email}, {$set: {password: confirmCode}});
                return res.status(200).json({success: true, message: "Please check your inbox of mail."});
            }
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async resetPassword(req, res) {
        try {
            const {email, confirmCode} = req.body;
            if (!email) return res.status(200).json({success: false, message: "Email not empty"});
            if (!confirmCode) return res.status(200).json({success: false, message: "Confirm Code not empty"});
            const user = await User.findOne({email});
            if (!user) return res.status(200).json({success: false, message: "User not exist"});
            if (confirmCode === user.password) {
                const newPass = randomString.generate();
                await User.updateOne({email: email}, {$set: {password: newPass}});
                await Mailer.resetPassword(user.username, user.email, newPass);
                return res.status(200).json({success: true, message: "Please check your inbox of mail."});
            }
            return res.status(200).json({success: false, message: "Confirmation code is incorrect."});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async findAddresses(req, res) {
        try {
            const {user} = req;
            const addresses = await multipleMongooseToObject(await UserAddress.find({userId: user._id}))
            const notDefaultAddress = [...addresses].filter(address => !address.isDefault)
            const defaultAddress = [...addresses].filter(address => address.isDefault)
            const payload = [...defaultAddress, ...notDefaultAddress]
            return res.status(200).json({success: true, addresses: payload});
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, error: error});
        }
    }

    async saveAddresses(req, res) {
        try {
            const {user} = req;
            const address = await mongooseToObject(await UserAddress.saveAddress({
                userId: user._id,
                ...req.body
            }))
            return res.status(200).json({success: true, address});
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }
    }

    async setDefaultAddress(req, res) {
        try {
            const user = req.user;
            const {_id, isDefault} = req.body;
            const address = await mongooseToObject(await UserAddress.setDefault({_id, isDefault, userId: user._id}))
            return res.status(200).json({success: true, address});
        } catch (error) {
            console.log(error)
            return res.status(500).json({success: false, error: error});
        }
    }
}

module.exports = new UserController