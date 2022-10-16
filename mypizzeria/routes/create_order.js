const Order = require("../models/Order");
const Product = require("../models/Product");
const checkAllProductsExist = require("../utils/checkAllProductsExist");
const calculateTotalPrice = require("../utils/calculateTotalPrice");
const {orderValidatorSchema} = require("../schemas/order_validator");

module.exports = async function(fastify, opts){
    const options = {schema: {body: orderValidatorSchema}}

    fastify.post('/orders', options, async function (request, reply) {
        const user_id = request.user_id;
        const productNames = request.body.products.map(p => p.code)
        const products = await Product.find({code: {$in: productNames}})
        const productCodes = products.map(p => p.code)
        // all products exist
        checkAllProductsExist(productNames, productCodes)

        // calculate price
        const totalPrice = calculateTotalPrice(request.body.products, products)
        const order = await Order.create({
            products, user:user_id, totalPrice
        })
        reply.status(201)
        return order
    })
}

