const Order = require("../models/Order");
const User = require("../models/User");
const {BadRequestError} = require("../errors");


module.exports = async function(fastify, opts){
    fastify.get('/orders/:order_id/details', async function (request, reply) {
        const user_id = request.user_id;
        const order = await Order.findOne({_id: request.params.order_id, user: user_id}).populate("products")
        if (!order){
            throw new BadRequestError()
        }
        return order
    })
}