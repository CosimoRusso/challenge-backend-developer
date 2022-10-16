const User = require('../models/User')
const Product = require('../models/Product')
const connectMongo = require("../models/create_connection");
const mongoose = require("mongoose")
const Order = require("../models/Order");



async function fillDatabase () {
    await connectMongo()
    let users = await User.find({});
    const needs_filling = users.length === 0
    if (!needs_filling){
        return;
    }
    users = [User({username: 'test_user', password: 'password'})]
    await User.create(users)

    products = [
        Product({code: 'pizza_margherita', displayName: "Pizza Margherita", priceUnitEur: 5}),
        Product({code: 'pizza_diavola', displayName: "Pizza Diavola", priceUnitEur: 6}),
        Product({code: 'pizza_kebab', displayName: "Pizza Kebab", priceUnitEur: 7}),
        Product({code: 'pizza_primavera', displayName: "Pizza Primaver", priceUnitEur: 8}),
        Product({code: 'pizza_cacio', displayName: "Pizza Cacio", priceUnitEur: 9}),
        Product({code: 'coca_cola', displayName: "Coca Cola", priceUnitEur: 2}),
        Product({code: 'fanta', displayName: "Fanta", priceUnitEur: 2}),
        Product({code: 'the_limone', displayName: "The Limone", priceUnitEur: 2})
    ]
    await Product.create(products)


    const margherita = products[0]
    const diavola = products[0]
    const coca_cola = products[5]
    orders = [
        Order({products: [
                {product: margherita._id, quantity: 2},
                {product: coca_cola._id, quantity: 2},
            ],
            user: users[0],
            totalPrice: 14
        }),
        Order({products: [
                {product: diavola._id, quantity: 1},
                {product: coca_cola._id, quantity: 1},
            ],
            user: users[0],
            totalPrice: 8
        }),
    ]
    await Order.create(orders)

}

fillDatabase().then(() => console.log("FILLED")).catch(console.log)