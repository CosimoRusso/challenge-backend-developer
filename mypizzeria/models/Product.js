const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    code: {type: String, unique: true, required: true},
    displayName: {type: String, required: true},
    priceUnitEur: {type: Number}
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product