async function updateRecommended() {
    // fazer após estruturar as contas
    const recommended = await getRecommended();
    console.log(recommended)
};

async function updateMostViewed(limit) {
    return await getProductsMostViewed(limit);
};

async function updateMostSold(limit) {
    const mostSold = await getProductsMostSold(limit);
    console.log(mostSold)

    mostSold.forEach((product) => {
        const li = document.createElement('li');
        li.classList.add('glide__slide');
    
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="/product/${product.id}">
                <img src="/api/productImages/${product.id}/1.jpg" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>R$ ${product.price}</p>
            </a>
        `;
    
        li.appendChild(div);
    
        document.querySelector('.maisVendidos .glide__slides').appendChild(li);
    });

};

async function updateLeastStock(limit) {
    return await getProductsLeastStock(limit);
};

// updateRecommended();
updateMostSold(5);

// glidejs
document.querySelectorAll('.maisVendidos').forEach((el) => {
    new Glide(el, {
        type: 'carousel',
        perView: 3,
        gap: 20,
        breakpoints: {
            1024: {
                perView: 2
            },
            768: {
                perView: 1
            },
        }
    }).mount();
});