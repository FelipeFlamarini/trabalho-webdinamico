async function updateRecommended() {
    // fazer após estruturar as contas
    const recommended = await getRecommended();
    console.log(recommended)
};

async function updateMostViewed(limit) {
    await getProductsMostViewed(limit)
    .then((products) => {
        createCards(products, '.maisVistos');
    });
};

async function updateMostSold(limit) {
    await getProductsMostSold(limit)
    .then((products) => {
        createCards(products, '.maisVendidos');
    });
};

async function updateLeastStock(limit) {
    await getProductsLeastStock(limit)
    .then((products) => {
        createCards(products, '.menosEstoque');
    });
};

async function createCards(products, className) {
    await products.forEach((product, index) => {
        const li = document.createElement('li');
        li.classList.add('glide__slide');
        li.classList.add('card');

        li.innerHTML = `
            <a href="/product/${product.id}">
                <img src="http://localhost:3000/api/productImages/${product.id}/1.jpg" alt="${product.nome}">
                <div>
                    <h3>${product.nome}</h3>
                    <p>R$ ${product.preco}</p>
                </div>
            </a>
        `;
    
        document.querySelector(`${className} .glide__slides`).appendChild(li);
        document.querySelector(`${className} .glide__bullets`).innerHTML += 
            `<button class="glide__bullet" data-glide-dir="=${index}">
                <i class="fa-solid fa-circle"></i>
            </button>
        `;
    });
    new Glide(document.querySelector(className), {
        type: 'carousel',
        perView: 4,
        gap: 20,
        autoplay: 5000,
        // length: 10,
        focusAt: 'center',
    }).mount();
}

// updateRecommended();
updateMostSold(10);
updateMostViewed(10);
updateLeastStock(10);
