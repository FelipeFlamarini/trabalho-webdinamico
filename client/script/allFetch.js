async function getAllProducts() {
    return await ((await fetch('http://localhost:3000/api/products/all')).json());
};

async function getRecommended() {
    
}