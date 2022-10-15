const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
module.exports = async function(fastify, opts){
    fastify.post('/orders', async function (request, reply) {
        const user = await User.findOne({username: request.user.payload.username})
        const productNames = request.body.products.map(p => p.code)
        const products = await Product.find({code: {$in: productNames}})
        const product_codes = products.map(p => p.code)

        // all products exist
        for (let p_name of productNames ){
            if (!product_codes.includes(p_name)){
                throw BadRequestError()
            }
        }

        // calculate price
        const totalPrice = request.body.products.reduce((accumulator, entry) => {
            return accumulator + products.find(p => p.code == entry.code).priceUnitEur * entry.quantity
        }, 0)
        const order = await Order.create({
            products, user, totalPrice
        })
        reply.status(201)
        return order
    })
}

