const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const ProductOptionValue = new Schema({
    name: {type: String, required: true, trim: true},
    optionId: {type: Schema.Types.ObjectId, required: true},
}, {timestamps: true})

ProductOptionValue.statics.saveProductOptionValue = async function (product) {
    return await this.create({...product});
}


module.exports = mongoose.model('ProductOptionValue', ProductOptionValue);
