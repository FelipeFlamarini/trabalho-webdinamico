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

async function cartCheckout(items) { // array no modelo [ {id: 1, quantity: 2}, {id: 2, quantity: 1}]
    return await fetch('http://localhost:3000/api/cart/checkout',
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: items,
    })
    .then(async response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    });
}