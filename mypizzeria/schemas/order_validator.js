const singleOrderItemSchema = {
    type: 'object',
    properties: {
        code: {type: 'string'},
        quantity: {type: 'integer'}
    },
    required: ["code", "quantity"]
}

const orderValidatorSchema = {
    type: 'object',
    properties: {
        items: {
            type: "array",
            items: singleOrderItemSchema,
            minItems: 1
        },
    },
    required: ["products"]
}

module.exports = {orderValidatorSchema}