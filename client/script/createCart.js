import { getProductById } from "./allFetch.js";
import { PriceCalculator } from "./price.js";
// console.log("a");

const calculator = new PriceCalculator();
//atualizar itens
// let allPrice=

const btnprice = document.getElementById("btnPrice");
btnprice.addEventListener("click", () => {
    // console.log(calculator.getTotalPrice());
});

function getIdsLocalStorage() {
    const ids = JSON.parse(localStorage.getItem("productID"));

    // console.log(ids);
    if (ids && ids.length !== 0) {
        const allTable = document.querySelector(".all-table");
        allTable.style.display = "flex";

        const emptyCart = document.querySelector(".empty-cart");
        emptyCart.style.display = "none";

        totalItens();
        ids.forEach((produto) => {
            teste(produto.id, produto.quantity);
            calculator.totalPrice = 0;
            putPrice(produto.quantity, produto.id);
        });
    }
    if (ids.length === 0) {
        const allTable = document.querySelector(".all-table");
        allTable.style.display = "none";

        const emptyCart = document.querySelector(".empty-cart");
        emptyCart.style.display = "flex";
        zeroPrice();
    }
}

function zeroPrice() {
    const price = document.getElementById("preco");
    calculator.totalPrice = 0;
    price.textContent = `$ ${calculator.getTotalPrice()}`;
}

async function teste(id, quantity) {
    const produto = await getProductById(id);
    // console.log(produto)
    CreateRows(produto, quantity);
}

function CreateRows(produto, quantity) {
    // console.log(produto.preco);
    const tbody = document.getElementById("content-table");

    const bodyRow = document.createElement("tr");
    const itemCell = document.createElement("td");

    const productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    const imgItem = document.createElement("img");
    imgItem.src = `http://localhost:3000/api/productImagesTransparent/${produto.id}/1.jpg`;
    imgItem.alt = produto.nome;
    imgItem.classList.add("img-item");

    const span1 = document.createElement("span");
    span1.textContent = produto.universo;

    const span2 = document.createElement("span");
    span2.textContent = `${produto.nome.split("!")[0]}!`;

    const span3 = document.createElement("span");
    span3.textContent = `${produto.nome.split("!")[1]}`;

    const imgTrash = document.createElement("img");
    imgTrash.src = "./img/cartTrash.svg";
    imgTrash.alt = "exclude button sybolized by trash";

    imgTrash.addEventListener("click", () => {
        const arrayOfIds = localStorage.getItem("productID")
            ? JSON.parse(localStorage.getItem("productID"))
            : [];
        const filterArray = arrayOfIds.filter((p) => p.id !== produto.id);
        // console.log("click");
        // console.log(filterArray);
        // console.log(filterArray.length);

        // console.log(arrayOfIds);
        localStorage.setItem("productID", JSON.stringify(filterArray));
        if (filterArray.length > 0) {
            filterArray.forEach((produto) => {
                calculator.totalPrice = 0;
                putPrice(produto.quantity, produto.id);
            });
            tbody.removeChild(bodyRow);
            totalItens();
        } else if (filterArray.length === 0) {
            const allTable = document.querySelector(".all-table");
            allTable.style.display = "none";

            const emptyCart = document.querySelector(".empty-cart");
            emptyCart.style.display = "flex";

            tbody.removeChild(bodyRow);
            zeroPrice();
            totalItens();
        }
    });

    const names = document.createElement("div");
    names.classList.add("names-product");
    names.appendChild(span1);
    names.appendChild(span2);
    names.appendChild(span3);

    productDetails.appendChild(imgItem);
    productDetails.appendChild(names);
    productDetails.appendChild(imgTrash);

    itemCell.appendChild(productDetails);
    const qtdCell = document.createElement("td");
    const select = document.createElement("select");
    select.classList.add("select-quantitys");
    // select.dataset.productId = produto.id
    select.addEventListener("change", (ev) => {
        // `${produto.id} + ${ev.target.value}`
        const arrayOfIds = localStorage.getItem("productID")
            ? JSON.parse(localStorage.getItem("productID"))
            : [];

        const found = arrayOfIds.find(
            (produtoLocal) => produtoLocal.id === produto.id
        );
        // console.log(found);
        if (found) {
            // total.textContent = ""
            // console.log(produto.preco)
            // console.log(found.quantity)
            found.quantity = +ev.target.value;
            total.textContent= `R$${found.quantity * produto.preco}`
            localStorage.setItem("productID", JSON.stringify(arrayOfIds));
            arrayOfIds.forEach((produto) => {
                calculator.totalPrice = 0;
                putPrice(produto.quantity, produto.id);
            });
            totalItens();
        }
    });

    for (let index = 1; index <= produto.estoque && index < 16; index++) {
        const option = document.createElement("option");
        option.setAttribute("value", index);
        option.textContent = index;

        if (index == quantity) {
            option.setAttribute("selected", "selected");
        }

        select.appendChild(option);
    }

    const spanSelect = document.createElement("span");
    spanSelect.textContent = "QTD";
    qtdCell.appendChild(spanSelect);
    qtdCell.appendChild(select);

    const totalCell = document.createElement("td");

    const totalLabel = document.createElement("span");
    totalLabel.textContent = "TOTAL";

    const total = document.createElement("span");
    
    const arrayOfIds = localStorage.getItem("productID")
            ? JSON.parse(localStorage.getItem("productID"))
            : [];

        const found = arrayOfIds.find(
            (produtoLocal) => produtoLocal.id === produto.id
        );
        
        if (found) {

            total.textContent = `R$${produto.preco * found.quantity}`;
        }

    totalCell.appendChild(totalLabel);
    totalCell.appendChild(total);

    bodyRow.appendChild(itemCell);
    bodyRow.appendChild(qtdCell);
    bodyRow.appendChild(totalCell);
    tbody.appendChild(bodyRow);
}

function totalItens() {
    // let totalItensCount = 0
    const arrayOfIds = localStorage.getItem("productID")
        ? JSON.parse(localStorage.getItem("productID"))
        : [];
    // arrayOfIds.forEach((produtos)=>{
    //   totalItensCount += produtos.quantity
    // })
    const totalItensCount = arrayOfIds.reduce(
        (total, produto) => total + produto.quantity,
        0
    );
    const totalItens = document.getElementById("total-itens");
    totalItens.textContent = `${totalItensCount} itens`;
}

async function putPrice(quantity, id) {
    // console.log(quantity, id);
    const produto = await getProductById(id);
    const preco = produto.preco;
    const priceText = document.getElementById("preco");

    calculator.addPrice(preco, quantity);
    // console.log(calculator.getTotalPrice());
    priceText.textContent = `R$ ${calculator.getTotalPrice()}`;
}

window.onload = () => {
    getIdsLocalStorage();
};

function a() {
    const quantitySelects = document.querySelectorAll(".select-quantitys");
    // console.log(quantitySelects)
    quantitySelects.forEach((select) => {
        select.addEventListener("change", (ev) => {
            const productId = select.dataset.productId;
            const newQuantity = ev.target.value;

            // Atualize a quantidade do item no localStorage com o novo valor do input
            // const cart = JSON.parse(localStorage.getItem("cart")) || {};
            // cart[productId].quantity = newQuantity;
            // localStorage.setItem("cart", JSON.stringify(cart));
        });
    });
}

document.querySelector("#btnPrice").addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("productID")).length === 0) {
    } else {
        window.location.href = "./checkout.html";
    }
});