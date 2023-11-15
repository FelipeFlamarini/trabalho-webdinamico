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
    await fetch(`http://localhost:3000/api/products/${id}`)
    .then(async response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else return await response;
    })
    .catch(error => {
        console.log(error);
    });
}




export {getAllProducts,getProductById}