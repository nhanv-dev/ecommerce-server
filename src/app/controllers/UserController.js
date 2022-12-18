const User = require('../models/User')

const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose')
const Category = require("../models/Category");
const jwt = require('jsonwebtoken');
const config = require("../../config/email");
const nodeMailer = require("nodemailer");
const randomString = require('randomstring');
const Mailer = require("../../utils/mailer");


class UserController {

    async findOne(req, res, next) {
        const user = await User.findOne({id: req.params.id})
        return res.status(200).json({success: true, user});
    }

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
            const {token} = req.query;
            const user = await mongooseToObject(await User.findOne({token: token}));
            if (!user) return res.status(200).json({success: false, message: "User not exist in Database"});
            if (user.isActive) return res.status(200).json({success: false, message: "Account activated"});
            const diff = Math.abs(new Date().getTime() - user.createdAt.getTime()) / 3600000;
            if (diff > 1) return res.status(200).json({success: false, message: "Authentication timeout"});
            await User.updateOne({email: user.email}, {$set: {token: "", isActive: true}});
            return res.status(200).json({success: true, message: "Successfully account activated"});
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
}

const userExample = {
    username: 'pigeon',
    password: '123',
    fullName: 'Pigeon',
    email: 'pigeonvnofficial@gmail.com',
    address: 'Ấp Trạm Bơm, P.Tân Phú Trung, Q.Củ Chi, Tp. Hồ Chí Minh',
    phone: '',
    isShop: true,
    isAdmin: false,
    isActive: true,
}

module.exports = new UserController