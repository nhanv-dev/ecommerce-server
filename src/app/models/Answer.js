const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Answer = new Schema({
    shopId: {type: Schema.Types.ObjectId, required: true},
    productId: {type: Schema.Types.ObjectId, required: true},
    content: {type: String, trim: true, required: true},
    isDisplay: {type: Boolean, default: true},
    reported: {type: Boolean, default: false},
}, {timestamps: true});


module.exports = mongoose.model('Answer', Answer);
