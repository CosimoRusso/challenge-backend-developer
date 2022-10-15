const {BadRequestError} = require("../errors");

function checkAllProductsExist(requestedProducts, dbProducts){
    for (let p_name of requestedProducts ){
        if (!dbProducts.includes(p_name)){
            throw new BadRequestError()
        }
    }
}

module.exports = checkAllProductsExist