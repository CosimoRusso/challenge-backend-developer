const Order = require("../models/Order");
const User = require("../models/User");
const {BadRequestError} = require("../errors");


module.exports = async function(fastify, opts){
    fastify.get('/orders/:order_id/details', async function (request, reply) {
        const user = await User.findOne({username: request.user.payload.username});
        const order = await Order.findOne({_id: request.params.order_id, user: user})
        if (!order){
            throw BadRequestError()
        }
        return order
    })
}