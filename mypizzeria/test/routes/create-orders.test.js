const {test} = require("tap");
const {build} = require("../helper");
const {doLogin} = require("../utils")

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