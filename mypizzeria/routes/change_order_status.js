const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const {BadRequestError} = require("../errors");
module.exports = async function(fastify, opts){
    fastify.patch('/orders/:order_id', async function (request, reply) {
        const new_status = request.body.status;
        const user_id = request.user_id;
        const order = await Order.findOne({_id: request.params.order_id, user: user_id})
        if (!order){
            throw new BadRequestError()
        }
        order.status = new_status;
        await order.save()
        return {_id: order._id, status: order.status}
    })
}

