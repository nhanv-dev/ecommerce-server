const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Answer = new Schema({
    accountId: {type: Schema.Types.ObjectId, required: true},
    shopId: {type: Schema.Types.ObjectId, required: true},
    questionId: {type: Schema.Types.ObjectId, required: true},
    productId: {type: Schema.Types.ObjectId, required: true},
    content: {type: String, trim: true, required: true},
    isDisplay: {type: Boolean, default: true},
    reported: {type: Boolean, default: false},
}, {timestamps: true});


Answer.statics.saveAnswer = async function (answer) {
    return await this.create({...answer});
}

module.exports = mongoose.model('Answer', Answer);
