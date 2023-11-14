async function teste() {
    const ids = ["maisVendidos", "maisVistos", "menosEstoque"];
    await Promise.all(ids.map(async (id) => {
        const holder = document.createElement('div');
        holder.classList.add('holder');
        holder.id = id;
        holder.innerHTML = `
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides"></ul>
            </div>
            <div class="glide__bullets" data-glide-el="controls[nav]"></div>`
        document.querySelector('.mainContainer').appendChild(holder);    
    }));
}

async function updateRecommended() {
    // fazer após estruturar as contas
    const recommended = await getRecommended();
    console.log(recommended)
};

async function updateMostViewed(limit) {
    await getProductsMostViewed(limit)
    .then((products) => {
        createCards(products, '#maisVistos');
    });
};

async function updateMostSold(limit) {
    await getProductsMostSold(limit)
    .then((products) => {
        createCards(products, '#maisVendidos');
    });
};

async function updateLeastStock(limit) {
    await getProductsLeastStock(limit)
    .then((products) => {
        createCards(products, '#menosEstoque');
    });
};

async function createCards(products, idName) {
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
    
        document.querySelector(`${idName} .glide__slides`).appendChild(li);
        document.querySelector(`${idName} .glide__bullets`).innerHTML += 
            `<button class="glide__bullet" data-glide-dir="=${index}">
                <i class="fa-solid fa-circle"></i>
            </button>
        `;
    });
    new Glide(document.querySelector(idName), {
        type: 'carousel',
        perView: 5,
        gap: 20,
        autoplay: 5000,
        // length: 10,
        focusAt: 'center',
    }).mount();
}

// updateRecommended();
teste()
.then(() => {
    updateMostSold(10);
    updateMostViewed(10);
    updateLeastStock(10);
})

