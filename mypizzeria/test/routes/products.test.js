const {test} = require("tap");
const {build} = require("../helper");
const {doLogin} = require("../utils");

test("count products", async t => {
    const app = await build(t)

    const token = await doLogin(app);
    let res = await app.inject({
        method: "GET",
        url: '/products/all',
        headers: {authorization: `Bearer ${token}`}
    })
    t.same(res.statusCode, 200)
    res = res.json()
    t.same(res.results.length, 5)
    t.ok(res.results.length < res.count)
})