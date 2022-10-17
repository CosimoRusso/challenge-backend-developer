const Product = require("../models/Product");
const {productsResponseSchema} = require('../schemas/products_schema')
const paginate = require("../utils/paginator");

module.exports = async function(fastify, opts){
    const options = {schema: productsResponseSchema}

    fastify.get('/products/all', options, async function (request, reply) {
        const pagination = paginate(request)

        const products = await Product.find({}, {}, pagination)
        const total = await Product.count()

        return {
            count: total,
            results: products
        }
    })
}