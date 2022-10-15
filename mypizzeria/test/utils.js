async function doLogin(app){
    const res = await app.inject({
        method: "POST",
        url: '/login',
        body: {
            username: 'test_user',
            password: 'password'
        }
    });

    return res.json().token
}

module.exports = {doLogin}