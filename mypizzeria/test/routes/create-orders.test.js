const {test} = require("tap");
const {build} = require("../helper");

test("post new order", async t => {
    const app = await build(t)

    let res = await app.inject({
        method: "POST",
        url: '/login',
        body: {
            username: 'test_user',
            password: 'password'
        }
    })
    token = res.json().token
    res = await app.inject({
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