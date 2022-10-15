const {test} = require("tap");
const {build} = require("../helper");
const {doLogin} = require("../utils")
const calculateTotalPrice = require("../../utils/calculateTotalPrice");
const checkAllProductsExist = require("../../utils/checkAllProductsExist");
const {BadRequestError} = require("../../errors");

test("post new order", async t => {
    const app = await build(t)

    const token = await doLogin(app);
    const res = await app.inject({
        method: "POST",
        url: '/orders',
        headers: {authorization: `Bearer ${token}`},
        body: {
            products: [
                {code: 'pizza_margherita', quantity: 1},
                {code: 'coca_cola', quantity: 2}
            ]
        }
    })
    t.same(res.statusCode, 201)
})

test("products not on db raises exception", async t => {
    const requestedProducts = ['a', 'b', 'c']
    const dbProducts = ['a', 'c']
    t.throws(checkAllProductsExist.bind(null, requestedProducts, dbProducts), new BadRequestError())
})

test("calculate total price", async t => {
    const productsInOrder = [{
        code: "a",
        quantity: 3
    },{
        code: "b",
        quantity: 2
    }]
    const productsOnDb = [
        {code: "a", priceUnitEur: 10},
        {code: "b", priceUnitEur: 1},
    ]
    const price = calculateTotalPrice(productsInOrder, productsOnDb)
    t.same(price, 32)
})

