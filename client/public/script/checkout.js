import port from "./config.js";

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

async function paymentMethod() {
    const metodos = document.querySelectorAll(".metodosPagamento span");
    metodos[0].classList.add("active");
    metodos.forEach((metodo, index) => {
        metodo.onclick = function () {
            activate(index);
        };
    });
}

function activate(index) {
    const metodos = document.querySelectorAll(".metodosPagamento span");
    metodos.forEach((metodo) => {
        metodo.classList.remove("active");
    });
    metodos[index].classList.add("active");
}

async function getMaxQuantity() {
    const ids = await getIdsLocalStorage();
    const max = await Promise.all(
        ids.map(async (id) => {
            const res = await fetch(
                `http://localhost:${port}/api/products/${id.id}`
            );
            const product = await res.json();
            return product.estoque;
        })
    );
    return max;
}

function getIdsLocalStorage() {
    return JSON.parse(localStorage.getItem("productID"));
}

async function setCards() {
    const ids = await getIdsLocalStorage();
    return await ids.map(async (id, index) => {
        await fetch(`http://localhost:${port}/api/products/${id.id}`)
            .then((res) => res.json())
            .then((product) => {
                const nomeProduto = document.createElement("div");
                nomeProduto.classList.add("nomeProduto");
                nomeProduto.innerHTML = `
                <img src=http://localhost:${port}/api/productImagesTransparent/${product.id}/1.jpg></img>
                <div>
                    <h2>${product.nome}</h2>
                </div>
                `;
                document
                    .querySelector(".mainContainer")
                    .appendChild(nomeProduto);

                const quantidadeProduto = document.createElement("div");
                quantidadeProduto.classList.add("quantidadeProduto");
                // quantidadeProduto.innerHTML = `
                // <button onclick=decrement(${index},'quantity')>-</button>
                // <h2 id=quantity_${index}>${id.quantity}</h2>
                // <button onclick=increment(${index},'quantity')>+</button>
                // `;
                quantidadeProduto.innerHTML = `<h2 id=quantity_${index}>${id.quantity}</h2>`;
                document
                    .querySelector(".mainContainer")
                    .appendChild(quantidadeProduto);

                const precoFinalProduto = document.createElement("div");
                precoFinalProduto.classList.add("precoFinalProduto");
                precoFinalProduto.innerHTML = `
                <h2 class=price>R$ ${(product.preco * id.quantity).toFixed(
                    2
                )}</h2>
                `;
                document
                    .querySelector(".mainContainer")
                    .appendChild(precoFinalProduto);
            });
        updatePrices();
    });
}

async function increment(localStorageIndex, key) {
    const maxQuantity = await getMaxQuantity();
    const ids = await getIdsLocalStorage();
    const quantity = document.querySelector(`#quantity_${localStorageIndex}`);

    ids[localStorageIndex][key] += 1;
    if (ids[localStorageIndex][key] > maxQuantity[localStorageIndex]) {
        return;
    }

    localStorage.setItem("productID", JSON.stringify(ids));
    quantity.innerHTML = ids[localStorageIndex][key];

    updatePrices();
}

async function decrement(localStorageIndex, key) {
    const ids = await getIdsLocalStorage();
    const quantity = document.querySelector(`#quantity_${localStorageIndex}`);

    ids[localStorageIndex][key] -= 1;
    if (ids[localStorageIndex][key] < 1) {
        return;
    }

    localStorage.setItem("productID", JSON.stringify(ids));
    quantity.innerHTML = ids[localStorageIndex][key];

    updatePrices();
}

async function updatePrices() {
    const ids = await getIdsLocalStorage();
    let finalPrice = 0;

    const prices = document.querySelectorAll(".price");
    const promise = await ids.map(async (id, index) => {
        await fetch(`http://localhost:${port}/api/products/${id.id}`)
            .then((res) => res.json())
            .then((product) => {
                finalPrice += product.preco * id.quantity;
                // prices[index].innerHTML = `R$ ${(
                //     product.preco * id.quantity
                // ).toFixed(2)}`;
            });
    });

    await Promise.all(promise).then(() => {
        document.querySelector("#total").innerHTML = `R$ ${finalPrice.toFixed(
            2
        )}`;
        return parseFloat(finalPrice).toFixed(2);
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
    await fetch(`http://localhost:${port}/api/cart/checkout`, reqOptions).then(
        (res) => {
            console.log(res);
            if (res.status === 200) {
                localStorage.setItem("productID", JSON.stringify([]));
                const finalPrice = parseFloat(
                    document.querySelector("#total").innerHTML.split("R$ ")[1]
                );
                window.location.assign(
                    `http://localhost:3000/sucesso.html?price=${finalPrice}`);
            }
        }
    );
}

paymentMethod();
setCards();

document.querySelector("#checkoutButton").addEventListener("click", checkout);
