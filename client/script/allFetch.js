async function getAllProducts() {
    return await fetch ('http://localhost:3000/api/products/all')
    .then(async response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    })
};

async function getProductById(id) {
    await fetch(`http://localhost:3000/api/products/${id}`)
    .then(async response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('getProductById: Network response was not ok');
        }
        else return await response;
    })
    .catch(error => {
        console.log(error);
    });
};

async function getProductsMostViewed(limit) {
    // filtrar no banco de dados os produtos mais vistos
    return await fetch(`http://localhost:3000/api/productsFilters/mostViewed?limit=${limit}`)
    .then(async response => {
        if (!response.ok) {
            throw new Error('getProductsMostViewed: Network response was not ok');
        }
        return await response.json();
    })
}

async function getProductsMostSold(limit) {
    // filtrar no banco de dados os produtos mais vendidos
    const allProducts = await getAllProducts();
    return allProducts
};

async function getRecommended() {
    // filtrar no banco de dados os produtos recomendados
    const allProducts = await getAllProducts();
    return allProducts
};
