const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.plugin(mongoosePaginate);

const Question = new Schema({
    userId: {type: Schema.Types.ObjectId},
    productId: {type: Schema.Types.ObjectId, required: true},
    content: {type: String, trim: true, required: true},
    isDisplay: {type: Boolean, default: true},
    reported: {type: Boolean, default: false},
}, {timestamps: true});

Question.statics.findByProductId = async function ({productId, page, limit}) {
    if (!limit) limit = 10;
    if (!page) page = 1;
    return await this.find({productId, isDisplay: true}).limit(limit);
}
Question.statics.findByUserId = async function ({userId, page, limit}) {
    if (!limit) limit = 10;
    if (!page) page = 1;
    return await this.find({userId, isDisplay: true}).limit(limit);
}

Question.statics.saveQuestion = async function (question) {
    return await this.create({...question});
}

module.exports = mongoose.model('Question', Question);
