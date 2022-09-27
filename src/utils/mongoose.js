module.exports = {
    multipleMongooseToObject: function (list) {
        return list.map(item => item.toObject())
    },
    mongooseToObject: function (object) {
        return object ? object.toObject() : object
    }
}