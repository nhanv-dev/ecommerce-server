const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Evaluate = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    productId: {type: Schema.Types.ObjectId, required: true},
    images: [{url: {type: String}}],
    content: {type: String},
    starRating: {type: Number, default: 0}
}, {timestamps: true});


Evaluate.statics.saveEvaluate = async function (userId, productId, images, content, starRating) {
    return await this.create({userId, productId, images, content, starRating});
}
Evaluate.statics.findByEvaluateId = async function (productId) {
    if (!productId) throw ({error: 'Id of product is not empty'});
    return await this.find({productId});
}

module.exports = mongoose.model('Evaluate', Evaluate);
