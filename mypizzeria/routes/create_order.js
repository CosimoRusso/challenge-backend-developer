const Order = require("../models/Order");
const Product = require("../models/Product");
const checkAllProductsExist = require("../utils/checkAllProductsExist");
const calculateTotalPrice = require("../utils/calculateTotalPrice");
const {orderValidatorSchema} = require("../schemas/order_validator");
const {orderSchema} = require("../schemas/orders_schema");

module.exports = async function(fastify, opts){
    const options = {
        schema: {
            body: orderValidatorSchema,
            response: {
                201: orderSchema
            }
        }
    }

    fastify.post('/orders', options, async function (request, reply) {
        const user_id = request.user_id;
        const productNames = request.body.products.map(p => p.code)
        const dbProducts = await Product.find({code: {$in: productNames}})
        const dbProductCodes = dbProducts.map(p => p.code)
        // all products exist
        checkAllProductsExist(productNames, dbProductCodes)

        const orderProducts = request.body.products.map(reqProd => {
            return {
                product: dbProducts.find(p => p.code === reqProd.code),
                quantity: reqProd.quantity
            }
        })

        // calculate price
        const totalPrice = calculateTotalPrice(request.body.products, dbProducts)
        const order = await Order.create({
            products: orderProducts, user:user_id, totalPrice
        })
        reply.status(201)
        return order
    })
}

