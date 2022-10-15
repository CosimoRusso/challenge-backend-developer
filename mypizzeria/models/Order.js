const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }, quantity: {
            type: Number,
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ["ORDERED", "RECEIVED"]
    },
    totalPrice: {
        type: Number
    }

}, {timestamps: true})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;