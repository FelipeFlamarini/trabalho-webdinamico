import { getProductById } from "./allFetch.js";
import { PriceCalculator } from "./price.js";
console.log("a")

const calculator = new PriceCalculator();

// let allPrice= 

function getIdsLocalStorage(){
  const ids = JSON.parse(localStorage.getItem("productID")) 
  
  console.log(ids)
  if (ids){
    totalItens(ids.length)
    ids.forEach(id => {
      teste(id)
    });
  }
}


async function teste(id) {
  const produto = await getProductById(id)
  console.log(produto)
  CreateRows(produto)
  putPrice(produto.preco)
}




function CreateRows(produto) {
const tbody = document.getElementById("content-table");

const bodyRow = document.createElement('tr');
const itemCell = document.createElement('td');

const productDetails = document.createElement('div');
productDetails.classList.add('product-details');

const imgItem = document.createElement('img');
imgItem.src=`http://localhost:3000/api/productImages/${produto.id}/1.jpg`
imgItem.alt=produto.nome
imgItem.classList.add('img-item');

const span1 = document.createElement('span');
span1.textContent = produto.universo;

const span2 = document.createElement('span');
span2.textContent = produto.nome;

const imgTrash = document.createElement('img');
imgTrash.src= './img/trash.svg'
imgTrash.alt = 'exclude buttonn sybolized by trash'

const names = document.createElement('div')
names.classList.add("names-product")
names.appendChild(span1)
names.appendChild(span2)

productDetails.appendChild(imgItem);
productDetails.appendChild(names);
productDetails.appendChild(imgTrash);

itemCell.appendChild(productDetails);
const qtdCell = document.createElement('td');
const select = document.createElement('select');

const option = document.createElement('option');
option.setAttribute('value', '1');
option.textContent = '1';

select.appendChild(option);
qtdCell.appendChild(select);

const totalCell = document.createElement('td');
totalCell.textContent = produto.preco;

bodyRow.appendChild(itemCell);
bodyRow.appendChild(qtdCell);
bodyRow.appendChild(totalCell);
tbody.appendChild(bodyRow);
}

function totalItens(total) {
  const totalItens = document.getElementById("total-itens")
  totalItens.textContent = total
}

function putPrice(preco){
  const priceText = document.getElementById("preco")
  calculator.addPrice(preco)
  // console.log(calculator.getTotalPrice() + "teste")
  priceText.textContent = calculator.getTotalPrice()
}

window.onload = () => {
  getIdsLocalStorage()
}