function teste() {
    localStorage.setItem(
        "productID",
        JSON.stringify([
            {
                id: 1,
                quantity: 1,
            },
            {
                id: 2,
                quantity: 2,
            },
        ])
    );
}

function getIdsLocalStorage() {
    return JSON.parse(localStorage.getItem("productID"));
}

async function setCards() {
    const ids = await getIdsLocalStorage();
    ids.forEach(async (id, index) => {
        await fetch(`http://localhost:3000/api/products/${id.id}`)
            .then((res) => res.json())
            .then((product) => {
                const nomeProduto = document.createElement("div");
                nomeProduto.classList.add("nomeProduto");
                nomeProduto.innerHTML = `
                <img src=http://localhost:3000/api/productImagesTransparent/${product.id}/1.jpg></img>
                <div>
                    <h2>${product.nome}</h2>
                </div>
                `;
                document.querySelector('.mainContainer').appendChild(nomeProduto);

                const quantidadeProduto = document.createElement("div");
                quantidadeProduto.classList.add("quantidadeProduto");
                quantidadeProduto.innerHTML = `
                <button onclick=decrement(${index},'quantity')>-</button>
                <h2 id=quantity_${index}>${id.quantity}</h2>
                <button onclick=increment(${index},'quantity')>+</button>
                `;
                document.querySelector('.mainContainer').appendChild(quantidadeProduto);

                const precoFinalProduto = document.createElement("div");
                precoFinalProduto.classList.add("precoFinalProduto");
                precoFinalProduto.innerHTML = `
                <h2 class=price>R$ ${(product.preco * id.quantity).toFixed(2)}</h2>
                `;
                document.querySelector('.mainContainer').appendChild(precoFinalProduto);
            });
    });
}

async function increment(localStorageIndex, key) {
    const ids = await getIdsLocalStorage();
    const quantity = document.querySelector(`#quantity_${localStorageIndex}`);

    ids[localStorageIndex][key] += 1;

    localStorage.setItem('productID', JSON.stringify(ids));
    quantity.innerHTML = ids[localStorageIndex][key];

    updatePrices();
}

async function decrement(localStorageIndex, key) {
    const ids = await getIdsLocalStorage();
    const quantity = document.querySelector(`#quantity_${localStorageIndex}`);

    ids[localStorageIndex][key] -= 1;
    if (ids[localStorageIndex][key] < 1) {
        return
    }

    localStorage.setItem('productID', JSON.stringify(ids));
    quantity.innerHTML = ids[localStorageIndex][key];

    updatePrices();
}

async function updatePrices() {
    const ids = await getIdsLocalStorage();

    const prices = document.querySelectorAll('.price');
    ids.forEach(async (id, index) => {
        await fetch(`http://localhost:3000/api/products/${id.id}`)
            .then((res) => res.json())
            .then((product) => {
                prices[index].innerHTML = `R$ ${(product.preco * id.quantity).toFixed(2)}`;
            });
    });
}

async function checkout() {
    const ids = await getIdsLocalStorage();

    const reqOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
    };
    await fetch("http://localhost:3000/api/cart/checkout", reqOptions).then(
        (res) => {
            console.log(res);
            if (res.status === 200) {
                window.location.assign(
                    "http://localhost:5500/client/sucesso.html"
                );
            } else {
                window.location.assign(
                    "http://localhost:5500/client/erro.html"
                );
            }
        }
    );
}

teste()
setCards();