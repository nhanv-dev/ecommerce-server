const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const UserAddress = new Schema({
    userId: {type: String, required: true},
    fullName: {type: String, required: true},
    city: {type: String, required: true},
    district: {type: String, required: true},
    wards: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: false},
    checked: {type: Boolean, default: false},
    isDefault: {type: Boolean, default: false}
}, {timestamps: true})

UserAddress.statics.saveAddress = async function (item) {
    return await this.create({
        userId: item.userId,
        fullName: item.fullName,
        city: item.city,
        district: item.district,
        wards: item.wards,
        phone: item.phone,
        address: item.address,
        email: item.email,
        checked: item.checked,
        isDefault: item.isDefault,
    });
}

UserAddress.statics.setDefault = async function (item) {
    await this.updateMany({userId: item.userId, isDefault: true}, {$set: {isDefault: false}});
    await this.updateOne({_id: item._id}, {$set: {isDefault: item.isDefault}});
    return await this.findOne({_id: item._id});
}

module.exports = mongoose.model('UserAddress', UserAddress);
