async function updateRecommended() {
    const recommended = await getRecommended();
    console.log(recommended)
};

async function updateMostViewed(limit) {
    const mostViewed = await getProductsMostViewed(limit);
    console.log(mostViewed)
};

async function updateMostSold(limit) {
    const mostSold = await getProductsMostSold(limit);
    console.log(mostSold);
};

async function updateLeastStock(limit) {
    const leastStock = await getProductsLeastStock(limit);
    console.log(leastStock);
};

updateRecommended();
updateMostViewed(5);
updateMostSold(5);
updateLeastStock(5);