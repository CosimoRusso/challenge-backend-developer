const Order = require("../models/Order");
const {paginatedOrdersSchema} = require("../schemas/orders_schema");
const paginate = require("../utils/paginator");


module.exports = async function(fastify, opts){
    const options = {
        schema: {
            response: {
                200: paginatedOrdersSchema
            }
        }
    }


    fastify.get('/orders/all', options, async function (request, reply) {
        const user_id = request.user_id;
        const pagination = paginate(request)

        const orders = await Order.find({user: user_id}, {}, pagination).populate("products.product")
        const total = await Order.count()

        return {
            count: total,
            results: orders
        }
    })
}