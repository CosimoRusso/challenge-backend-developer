function calculateTotalPrice(productsInOrder, productsOnDb){
    return productsInOrder.reduce((accumulator, entry) => {
        return accumulator + productsOnDb.find(p => p.code == entry.code).priceUnitEur * entry.quantity
    }, 0)
}

module.exports = calculateTotalPrice