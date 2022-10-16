const {productSchema} = require("./products_schema");


const productOrderSchema = {
    type: "object",
    properties: {
        product: productSchema,
        quantity: {
            type: "integer"
        }
    },
    required: ["product", "quantity"]
}

const orderSchema = {
    type: "object",
    properties: {
        _id: {type: "string"},
        products: {
            type: "array",
            items: productOrderSchema,
            minItems: 1
        },
        status: {type: "string"},
        createdAt: {type: "string"}
    },
    required: ["_id", "products", "status", "createdAt"]
}

const ordersListSchema = {
    type: "array",
    items: orderSchema
}

const paginatedOrdersSchema = {
    type: "object",
    properties: {
        count: {type: "integer"},
        results: ordersListSchema
    },
    required: ["count", "results"]
}

module.exports = {orderSchema, ordersListSchema, paginatedOrdersSchema}