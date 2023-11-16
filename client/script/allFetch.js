async function getAllProducts() {
    return await fetch ('http://localhost:3000/api/products/all')
    .then(async response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    })
};

async function getProductById(id) {
    return await fetch(`http://localhost:3000/api/products/${id}`)
    .then(async response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json()
    })

    .catch(error => {
        console.log(error);
    });
}

async function GetProductByUniverse(specificUniverse) {
    return await fetch(`http://localhost:3000/api/products/universe/${encodeURIComponent(specificUniverse)}`)
    .then(async response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json()
    })

    .catch(error => {
        console.log(error);
    });
}

async function GetProductByPrice(orderPrice) {
    return await fetch(`http://localhost:3000/api/products/price/${orderPrice}`)
    .then(async response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json()
    })

    .catch(error => {
        console.log(error);
    });
}

export {getAllProducts,getProductById,GetProductByUniverse,GetProductByPrice}