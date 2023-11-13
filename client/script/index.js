async function updateRecommended() {
    // fazer após estruturar as contas
    const recommended = await getRecommended();
    console.log(recommended)
};

async function updateMostViewed(limit) {
    const mostViewed = await getProductsMostViewed(limit);
    console.log(mostViewed);

    mostViewed.forEach((product) => {
        const li = document.createElement('li');
        li.classList.add('glide__slide');
    
        li.innerHTML = `
            <a href="/product/${product.id}">
                <img src="http://localhost:3000/api/productImages/${product.id}/1.jpg" alt="${product.nome}">
                <h3>${product.nome}</h3>
                <p>R$ ${product.preco}</p>
            </a>
        `;
    
        document.querySelector('.maisVistos .glide__slides').appendChild(li);
    });
};

async function updateMostSold(limit) {
    const mostSold = await getProductsMostSold(limit);
    console.log(mostSold);

    mostSold.forEach((product) => {
        const li = document.createElement('li');
        li.classList.add('glide__slide');
    
        li.innerHTML = `
            <a href="/product/${product.id}">
                <img src="http://localhost:3000/api/productImages/${product.id}/1.jpg" alt="${product.nome}">
                <h3>${product.nome}</h3>
                <p>R$ ${product.preco}</p>
            </a>
        `;
    
        document.querySelector('.maisVendidos .glide__slides').appendChild(li);
    });
};

async function updateLeastStock(limit) {
    const leastStock = await getProductsLeastStock(limit);
    console.log(leastStock);

    leastStock.forEach((product) => {
        const li = document.createElement('li');
        li.classList.add('glide__slide');
    
        li.innerHTML = `
            <a href="/product/${product.id}">
                <img src="http://localhost:3000/api/productImages/${product.id}/1.jpg" alt="${product.nome}">
                <h3>${product.nome}</h3>
                <p>R$ ${product.preco}</p>
            </a>
        `;
    
        document.querySelector('.menosEstoque .glide__slides').appendChild(li);
    });
};

// updateRecommended();
updateMostSold(5)
.then(() => {
    // glidejs
    document.querySelectorAll('.maisVendidos').forEach((el) => {
        new Glide(el, {
            type: 'carousel',
            // perView: 3,
            // gap: 20,
            // breakpoints: {
            //     1024: {
            //         perView: 2
            //     },
            //     768: {
            //         perView: 1
            //     },
            // }
        }).mount();
    });
});

updateMostViewed(5)
.then(() => {
    // glidejs
    document.querySelectorAll('.maisVistos').forEach((el) => {
        new Glide(el, {
            type: 'carousel',
            // perView: 3,
            // gap: 20,
            // breakpoints: {
            //     1024: {
            //         perView: 2
            //     },
            //     768: {
            //         perView: 1
            //     },
            // }
        }).mount();
    });
});

updateLeastStock(5)
.then(() => {
    // glidejs
    document.querySelectorAll('.menosEstoque').forEach((el) => {
        new Glide(el, {
            type: 'carousel',
            // perView: 3,
            // gap: 20,
            // breakpoints: {
            //     1024: {
            //         perView: 2
            //     },
            //     768: {
            //         perView: 1
            //     },
            // }
        }).mount();
    });
});