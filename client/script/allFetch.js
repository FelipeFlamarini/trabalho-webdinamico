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

async function getRecommended() {
    console.log(await getAllProducts());
}
 export {getProductById}