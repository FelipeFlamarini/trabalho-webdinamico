import { getAllProducts, getProductById } from "./allFetch.js";
console.log("a")

async function teste() {
  const aa = await getAllProducts()
  console.log(aa)
  let bb = await getProductById(1)
  console.log(bb)
}

function CreateRows(produto) {
  // create table element
const tbody = document.createElement("tbody");
console.log(produto)
// // create table header
// const thead = document.createElement('thead');
// const headerRow = document.createElement('tr');
// const itemHeader = document.createElement('th');
// itemHeader.textContent = 'item';
// const qtdHeader = document.createElement('th');
// qtdHeader.textContent = 'qtd';
// const totalHeader = document.createElement('th');
// totalHeader.textContent = 'Total';

// headerRow.appendChild(itemHeader);
// headerRow.appendChild(qtdHeader);
// headerRow.appendChild(totalHeader);
// thead.appendChild(headerRow);

// create table body
// const tbody = document.createElement('tbody');
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

productDetails.appendChild(imgItem);
productDetails.appendChild(span1);
productDetails.appendChild(span2);
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

// add header and body to table
// table.appendChild(thead);
// tab.appendChild(tbody);
}

teste()

