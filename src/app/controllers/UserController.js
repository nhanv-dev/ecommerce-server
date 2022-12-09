const User = require('../models/User')

const {multipleMongooseToObject, mongooseToObject} = require('../../utils/mongoose')
const Category = require("../models/Category");
const jwt = require('jsonwebtoken');
const config = require("../../config/email");
const nodeMailer = require("nodemailer");
const randomstring = require("randomstring");
const Mailer = require("../../utils/mailer");


class UserController {

    async findOne(req, res, next) {

        await User.findOne({id: req.params.id}).then(async (user) => {
            const data = await mongooseToObject(user);
            res.send(data);
        }).catch(next)

    }

    async create(req, res) {
        // try {
        //     const {firstName, lastName, email, username, password} = req.body;
        //     if (!firstName || !lastName || !email || !username || !password) return res.status(200).json({
        //         success: false,
        //         message: "Create user fail"
        //     });
        //     const token = randomstring.generate();
        //     await User.createUser(firstName, lastName, username, password, email, User.getUserTypes().CONSUMER);
        //     await User.updateOne({email: email}, {$set: {token: token}});
        //     await Mailer.activeAccount(username, email, token);
        //     return res.status(200).json({success: true});
        // } catch (error) {
        //     return res.status(500).json({success: false, error: error});
        // }
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
                const data = await mongooseToObject(user);
                const randomString = randomstring.generate();
                await User.updateOne({email: email}, {$set: {password: randomString}});
                await Mailer.resetPassword(data.username, data.email, randomString);
                return res.status(200).json({
                    success: true,
                    message: "Please check your inbox of mail."
                });
            }
        } catch (error) {
            return res.status(500).json({success: false, error: error});
        }

    }
}

module.exports = new UserController