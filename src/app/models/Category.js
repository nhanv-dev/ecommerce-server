const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Category = new Schema({
    name: {type: String, unique: true},
    slug: {type: String, unique: true, slug: 'name'},
    parentId: {type: Schema.Types.ObjectId},
}, {timestamps: true});


Category.statics.getAll = async function (limit) {
    const list = [];
    const parents = await this.find({parentId: null}).limit(limit);
    list.push(...parents)
    for (const parent of parents) {
        await this.find({parentId: parent._id}).then(res => list.push(...res))
    }
    return list;
}

Category.statics.saveCategory = async function (name, parent) {
    if (!name) throw ({error: 'Name of category is not empty'});
    const isExist = await this.findOne({name});
    if (isExist) throw ({error: 'Category is exist in database'});
    return await this.create({name, parent});
}

Category.statics.updateCategory = async function (id, name, parent) {
    if (!name) throw ({error: 'Name of category is not empty'});
    return await this.update({name, parent});
}

Category.statics.deleteCategory = async function (id) {
    if (!name) throw ({error: 'Name of category is not empty'});
    return await this.create({id});
}

Category.statics.getById = async function (id) {
    const category = await this.findOne(id);
    if (!category) throw ({error: 'No category with this id found'});
    return category;
}

Category.statics.getBySlug = async function (slug) {
    const category = await this.findOne({slug});
    if (!category) throw ({error: 'No category with this slug found'});
    return category;
}

module.exports = mongoose.model('Category', Category);
