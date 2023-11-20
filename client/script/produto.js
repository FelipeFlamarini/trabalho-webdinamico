async function getProductInfo(id) {
    return await fetch(`http://localhost:3000/api/products/${id}`)
    .then(async (res) => {
        return await res.json();
    }) 
}

async function setCards() {
    const id = window.location.search.split('id=')[1];
    // se não tiver id
    if (!id) window.location.href = './index.html'; 
    
    await getProductInfo(id)
    .then(async (product) => {
        document.title = product.nome.split('Funko Pop!')[1];
    });
}

setCards();