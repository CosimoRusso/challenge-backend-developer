const {test} = require("tap");
const {build} = require("../helper");

test("count orders", async t => {
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
        method: "GET",
        url: '/orders/all',
        headers: {authorization: `Bearer ${token}`}
    })
    t.same(res.statusCode, 200)
    res = res.json()
    t.same(res.results.length, 5)
    t.ok(res.results.length < res.count)
})