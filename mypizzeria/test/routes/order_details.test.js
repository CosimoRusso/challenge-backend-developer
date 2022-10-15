const {test} = require("tap");
const {build} = require("../helper");

test("get order details", async t => {
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
    const order_id = res.json()._id
    res = await app.inject({
        method: "GET",
        url: `/orders/${order_id}/details`,
        headers: {authorization: `Bearer ${token}`}
    });
    t.same(res.statusCode, 200)
    t.same(res.json()._id, order_id)
})