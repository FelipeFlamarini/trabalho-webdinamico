import { getProductsByName } from "./allFetch.js";

async function setSearchCards(name) {
    await getProductsByName(name, 3).then((products) => {
        products.forEach((product) => {
            const div = document.createElement("div");
            div.classList.add("searchCard");
            div.innerHTML = `
            <a href="/product/${product.id}">
                <div class="searchImg">
                    <img src="http://localhost:3000/api/productImagesTransparent/${product.id}/1.jpg" alt="${product.nome}"></img>
                </div>
                <div class="searchNome">
                    <span class=nome1>${product.nome.split("!")[0]}!</span>
                    <span class=nome2>${product.nome.split("!")[1]}</span>
                </div>
            </a>
            `;

            document.querySelector(".searchCards").appendChild(div);
        });
    });
}

async function clearSearchCards() {
    document.querySelector(".searchCards").innerHTML = "";
}

let timeoutId;

document
    .querySelector(".searchBar input")
    .addEventListener("keydown", async (event) => {
        clearSearchCards();
        clearTimeout(timeoutId); // Clear the previous timeout

        timeoutId = setTimeout(async () => {
            const search = document.querySelector(".searchBar input").value;
            if (search) {
                setSearchCards(search);
            } else {
                clearSearchCards();
            }
        }, 1000);
    });

document
    .querySelector(".searchBar input")
    .addEventListener("focus", async (event) => {
        clearSearchCards();
        clearTimeout(timeoutId); // Clear the previous timeout

        timeoutId = setTimeout(async () => {
            const search = document.querySelector(".searchBar input").value;
            if (search) {
                setSearchCards(search);
            } else {
                clearSearchCards();
            }
        }, 1000);
    });

document
    .querySelector(".searchBar input")
    .addEventListener("focusout", async (event) => {
        clearSearchCards();
    });
