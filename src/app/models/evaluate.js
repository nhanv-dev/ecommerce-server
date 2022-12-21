import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Evaluate = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    productId: {type: Schema.Types.ObjectId, required: true},
    images: [{url: {type: String}}],
    content: {type: String},
    starRating: {type: Number, default: 0}
}, {timestamps: true});

module.exports = mongoose.model('Evaluate', Evaluate);
