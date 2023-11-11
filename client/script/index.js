async function updateRecommended() {
    const recommended = await getRecommended();
    console.log(recommended)
};

async function updateMostViewed() {
    const mostSold = await getProductsMostViewed();
    console.log(mostSold)
};


updateRecommended();
updateMostViewed();