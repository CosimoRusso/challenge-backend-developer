const {test} = require("tap");
const {build} = require("../helper");

test("change order status", async t => {
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
        method: "PATCH",
        url: `/orders/${order_id}`,
        headers: {authorization: `Bearer ${token}`},
        body: {
            status: 'RECEIVED'
        }
    });
    t.same(res.statusCode, 200)
    t.save(res.json().status, "RECEIVED")
})