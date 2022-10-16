const {test} = require("tap");
const {build} = require("../helper");
const {doLogin} = require("../utils");

test("count orders", async t => {
    const app = await build(t)

    const token = await doLogin(app);
    let res = await app.inject({
        method: "GET",
        url: '/orders/all',
        headers: {authorization: `Bearer ${token}`}
    })
    t.same(res.statusCode, 200)
    res = res.json()
    t.ok(res.results.length <= 5)
})