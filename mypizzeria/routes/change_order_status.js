const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const {BadRequestError} = require("../errors");
module.exports = async function(fastify, opts){
    fastify.patch('/orders/:order_id', async function (request, reply) {
        const new_status = request.body.status;
        const user = await User.findOne({username: request.user.payload.username});
        const order = await Order.findOne({_id: request.params.order_id, user: user})
        if (!order){
            throw BadRequestError()
        }
        order.status = new_status;
        await order.save()
        return order
    })
}

