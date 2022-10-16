const Order = require("../models/Order");
const User = require("../models/User");
const {BadRequestError, NotFoundError} = require("../errors");
const {orderSchema} = require("../schemas/orders_schema");


module.exports = async function(fastify, opts){
    const options = {
        schema: {
            response: {
                200: orderSchema
            }
        }
    }

    fastify.get('/orders/:order_id/details', options, async function (request, reply) {
        const user_id = request.user_id;
        const order = await Order.findOne({_id: request.params.order_id, user: user_id}).populate("products.product")
        if (!order){
            throw new NotFoundError()
        }
        return order
    })
}