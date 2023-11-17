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
    ids.forEach(produto => {
      teste(produto.id,produto.quantity)
      calculator.totalPrice = 0
      putPrice(produto.quantity,produto.id)
    });
  }
  
}




async function teste(id,quantity) {
  const produto = await getProductById(id)
  // console.log(produto)
  CreateRows(produto,quantity)
  
}




function CreateRows(produto,quantity) {
  console.log(produto.preco)
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
select.classList.add("select-quantitys")
// select.dataset.productId = produto.id
select.addEventListener("change",(ev)=>{
  // `${produto.id} + ${ev.target.value}`
  const arrayOfIds = localStorage.getItem('productID') ? JSON.parse(localStorage.getItem('productID')) : []
  
  const found = arrayOfIds.find(produtoLocal => produtoLocal.id === produto.id);
  console.log(found)
  if(found){
    found.quantity = +ev.target.value;
    localStorage.setItem('productID', JSON.stringify(arrayOfIds))
    arrayOfIds.forEach((produto)=>{
      calculator.totalPrice = 0
      putPrice(produto.quantity,produto.id)
    })
  }

})


for (let index = 1; index < 16; index++) {
  const option = document.createElement('option');
  option.setAttribute('value', index);
  option.textContent = index

  if (index == quantity) {
    option.setAttribute('selected', 'selected');
  }

  select.appendChild(option);
}


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



async function putPrice(quantity,id){
  const produto = await getProductById(id)
  const preco =  produto.preco
  const priceText = document.getElementById("preco")

  calculator.addPrice(preco,quantity)
  console.log(calculator.getTotalPrice())
  priceText.textContent = calculator.getTotalPrice()
}

window.onload = () => {
  getIdsLocalStorage()
}

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
