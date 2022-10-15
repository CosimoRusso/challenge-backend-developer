'use strict'

const { test } = require('tap')
const { build } = require('../helper')


test('wrong username', async (t) => {
    const app = await build(t)

    const res = await app.inject({
        method: "POST",
        url: '/login',
        body: {
            username: 'xxxxxxxx',
            password: 'password'
        }
    })
    t.same(res.statusCode, 404)
})

test('wrong password', async (t) => {
    const app = await build(t)

    const res = await app.inject({
        method: "POST",
        url: '/login',
        body: {
            username: 'test_user',
            password: 'xxxxxxxxxx'
        }
    })
    t.same(res.statusCode, 400)
})

test("correct login", async t => {
    const app = await build(t)

    const res = await app.inject({
        method: "POST",
        url: '/login',
        body: {
            username: 'test_user',
            password: 'password'
        }
    })
    t.same(res.statusCode, 201)
})
