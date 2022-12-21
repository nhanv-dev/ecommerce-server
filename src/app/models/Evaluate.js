const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Evaluate = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    productId: {type: Schema.Types.ObjectId, required: true},
    images: [{url: {type: String}}],
    content: {type: String},
    rating: {type: Number, default: 1}
}, {timestamps: true});


Evaluate.statics.saveEvaluate = async function (userId, productId, images, content, rating) {
    return await this.create({userId, productId, images, content, rating});
}
Evaluate.statics.findByEvaluateId = async function (productId) {
    if (!productId) throw ({error: 'Id of product is not empty'});
    return await this.find({productId});
}

module.exports = mongoose.model('Evaluate', Evaluate);
