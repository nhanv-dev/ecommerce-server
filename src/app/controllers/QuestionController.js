const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const jwt = require("jsonwebtoken");
const {mongooseToObject, multipleMongooseToObject} = require("../../utils/mongoose");

class QuestionController {

    async saveQuestion(req, res) {
        try {
            const payload = {userId: null};
            const authHeader = req.headers.token;
            if (authHeader) {
                await jwt.verify(authHeader.split(" ")[1], 'RESTFULAPIs', (err, user) => {
                    if (!err) payload.userId = user._id;
                }, null);
            }
            const {productId, content} = req.body;
            const question = await mongooseToObject(await Question.saveQuestion({
                userId: payload.userId,
                productId,
                content
            }));
            const user = await mongooseToObject(await User.findOne({_id: question.userId.toString()}));
            const data = {...question, user: {fullName: user.fullName}}
            return res.status(200).json({success: true, question: {...data}});
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    }

    async findByProductId(req, res) {
        try {
            const {productId, page} = req.query;
            const options = {page: page || 1, limit: 12,};
            const questions = await multipleMongooseToObject(await Question.findByProductId({productId, ...options}));
            const answers = await multipleMongooseToObject(await Answer.find({
                questionId: {
                    $in: [...questions].map(question => question._id)
                }
            }));
            const users = await multipleMongooseToObject(await User.find({
                _id: {
                    $in: [...questions].filter(question => !!question.userId).map(question => question.userId)
                }
            }));
            let payload = [...questions].map(question => {
                const data = [...answers].filter(answer => answer.questionId.toString() === question._id.toString());
                return {...question, answers: data}
            })
            payload = [...payload].map(item => {
                const data = [...users].filter(user => user._id?.toString() === item.userId?.toString());
                if (data.length > 0)
                    return {
                        ...item, user: {fullName: data[0].fullName}
                    }
                return {...item}
            })
            return res.status(200).json({success: true, questions: payload});
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async findByUserId(req, res) {
        try {
            const userId = req.user._id;
            const {page} = req.query;
            const options = {page: page || 1, limit: 12};
            const questions = await multipleMongooseToObject(await Question.findByUserId({userId, ...options}));
            const answers = await multipleMongooseToObject(await Answer.find({
                questionId: {$in: [...questions].map(question => question._id)}
            }));
            const users = await multipleMongooseToObject(await User.find({
                _id: {$in: [...questions].filter(question => !!question.userId).map(question => question.userId)}
            }));
            const products = await multipleMongooseToObject(await Product.find({
                _id: {$in: [...questions].filter(question => !!question.productId).map(question => question.productId)}
            }));
            const shops = await multipleMongooseToObject(await Shop.find({
                _id: {$in: [...products].map(product => product.shopId)}
            }));
            let payload = [...questions].map(question => {
                const payload = {};
                const answersData = [...answers].filter(answer => answer.questionId.toString() === question._id.toString());
                const productData = [...products].filter(product => product._id.toString() === question.productId.toString());
                if (productData.length > 0) {
                    payload.product = productData[0]
                    const shopData = [...shops].filter(shop => shop._id.toString() === productData[0].shopId.toString());
                    payload.shop = shopData[0]
                }
                return {...question, answers: answersData, ...payload}
            })

            payload = [...payload].map(item => {
                const data = [...users].filter(user => user._id?.toString() === item.userId?.toString());
                if (data.length > 0)
                    return {
                        ...item, user: {fullName: data[0].fullName}
                    }
                return {...item}
            })
            return res.status(200).json({success: true, questions: payload});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new QuestionController