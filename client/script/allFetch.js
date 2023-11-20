async function getAllProducts() {
    return await fetch("http://localhost:3000/api/products/all").then(
        async (response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return await response.json();
        }
    );
}

async function getProductById(id) {
    return await fetch(`http://localhost:3000/api/products/${id}`)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error("getProductById: Network response was not ok");
            }
            return await response.json();
        })

        .catch((error) => {
            console.log(error);
        });
}

async function getProductsMostViewed(limit) {
    // filtrar no banco de dados os produtos mais vistos
    return await fetch(
        `http://localhost:3000/api/productsFilters/mostViewed?limit=${limit}`
    ).then(async (response) => {
        if (!response.ok) {
            throw new Error(
                "getProductsMostViewed: Network response was not ok"
            );
        }
        return await response.json();
    });
}

async function getProductsMostSold(limit) {
    // filtrar no banco de dados os produtos mais vendidos
    return await fetch(
        `http://localhost:3000/api/productsFilters/mostSold?limit=${limit}`
    ).then(async (response) => {
        if (!response.ok) {
            throw new Error("getProductsMostSold: Network response was not ok");
        }
        return await response.json();
    });
}

async function getProductsLeastStock(limit) {
    // filtrar no banco de dados os produtos com menos estoque
    return await fetch(
        `http://localhost:3000/api/productsFilters/leastStock?limit=${limit}`
    ).then(async (response) => {
        if (!response.ok) {
            throw new Error(
                "getProductsLeastStock: Network response was not ok"
            );
        }
        return await response.json();
    });
}

async function GetProductByUniverse(specificUniverse, limit) {
    return await fetch(
        `http://localhost:3000/api/products/universe/${encodeURIComponent(
            specificUniverse
        )}?limit=${limit}`
    )
        .then(async (response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return await response.json();
        })

        .catch((error) => {
            console.log(error);
        });
}

async function getRecommended() {
    // filtrar no banco de dados os produtos recomendados
    const allProducts = await getAllProducts();
    return allProducts;
}

async function cartCheckout(items) {
    // array no modelo [ {id: 1, quantity: 2}, {id: 2, quantity: 1}]
    return await fetch("http://localhost:3000/api/cart/checkout", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: items,
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    });
}

async function getProductsByName(name, limit) {
    return await fetch(
        `http://localhost:3000/api/productsSearch?name=${encodeURIComponent(name
        )}&limit=${parseInt(limit)}`
    )
        .then(async (response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return await response.json();
        })

        .catch((error) => {
            console.log(error);
        });
}

export {
    getAllProducts,
    getProductById,
    getProductsMostViewed,
    getProductsMostSold,
    getProductsLeastStock,
    getRecommended,
    GetProductByUniverse,
    getProductsByName,
};
