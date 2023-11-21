import { addInCart } from "./addInCart.js";
import { getProductById } from "./allFetch.js";


localStorage.setItem('produtoAtual',JSON.stringify(1))

function produtsReturn() {
  const arrayOfIds = localStorage.getItem('productID') ? JSON.parse(localStorage.getItem('productID')) : []
  return arrayOfIds
}

function renderProduto(produto){
  const containerProduto = document.getElementById("container-produtoID");
// containerProduto.classList.add('container-produto');

const containerImage = document.createElement('div');
containerImage.classList.add('container-image');

const image = document.createElement('img');
image.src = `../server/public/imgs/produtosTransparent/${produto.id}/1.jpg`;
image.alt = '';

containerImage.appendChild(image);

const productDetails = document.createElement('div');
productDetails.classList.add('product-details');

const detailsDiv1 = document.createElement('div');
const brandSpan = document.createElement('span');
brandSpan.textContent = produto.universo;

const title1H1 = document.createElement('h1');
title1H1.textContent = `${produto.nome.split('!')[0]}!`;
const title2H1 = document.createElement('h1');
title2H1.textContent = `${produto.nome.split('!')[1]}`;
const priceSpan= document.createElement('span');
priceSpan.id = ('produtoPreco');
priceSpan.textContent = `R$ ${produto.preco}`;

detailsDiv1.appendChild(brandSpan);
detailsDiv1.appendChild(title1H1);
detailsDiv1.appendChild(title2H1);
detailsDiv1.appendChild(priceSpan);

const detailsDiv2 = document.createElement('div');
const descriptionP = document.createElement('p');
descriptionP.textContent = produto.descricao;

detailsDiv2.appendChild(descriptionP);

const detailsDiv3 = document.createElement('div');
const changesbuttonDiv3 = document.createElement('div')
changesbuttonDiv3.classList.add("changes-button")
const cartImage = document.createElement('img');
cartImage.src = './imgs/cart.svg';
cartImage.alt = '';
const buttonElement = document.createElement('button');
buttonElement.innerHTML = "adicionar ao <br> carrinho"
buttonElement.addEventListener("click",() =>{
  console.log("a")
  addInCart(produto)
  changesbuttonDiv3.style.display ='flex'
  buttonElement.style.display= 'none'
})
const selectElement = document.createElement('select');

const arrayOfIds = localStorage.getItem('productID') ? JSON.parse(localStorage.getItem('productID')) : []
const purchasedProduct = arrayOfIds.find(item => item.id == produto.id);

if(purchasedProduct){
  changesbuttonDiv3.style.display ='flex'
  buttonElement.style.display= 'none'
}

const valueSelect = purchasedProduct ? purchasedProduct.quantity : undefined;

for (let index = 1; index < 16; index++) {
  const option = document.createElement('option');
      option.setAttribute('value', index);
      option.textContent = index
      
      if (index === valueSelect) {
        console.log(index)
        option.setAttribute('selected', 'selected');
      }

      selectElement.appendChild(option);
  
}

selectElement.addEventListener("change",(ev)=>{
  const arrayOfIds = localStorage.getItem('productID') ? JSON.parse(localStorage.getItem('productID')) : []
  
  const found = arrayOfIds.find(produtoLocal => produtoLocal.id === produto.id);
  
  if(found){
    found.quantity = +ev.target.value;
    localStorage.setItem('productID', JSON.stringify(arrayOfIds))
  }

})


const spanElement = document.createElement('span')
spanElement.textContent ="Adicionado"
const trashImage = document.createElement('img');
trashImage.src = './imgs/individualTrash.svg';
trashImage.alt = '';
trashImage.addEventListener('click',()=>{
  const arrayOfIds = produtsReturn()
  const filterArray = arrayOfIds.filter( p => p.id !== produto.id)
  localStorage.setItem('productID', JSON.stringify(filterArray))
  changesbuttonDiv3.style.display ='none'
  buttonElement.style.display= 'block'
})



detailsDiv3.appendChild(cartImage);
detailsDiv3.appendChild(buttonElement);
detailsDiv3.appendChild(changesbuttonDiv3)

changesbuttonDiv3.appendChild(selectElement);
changesbuttonDiv3.appendChild(spanElement)
changesbuttonDiv3.appendChild(trashImage);

productDetails.appendChild(detailsDiv1);
productDetails.appendChild(detailsDiv2);
productDetails.appendChild(detailsDiv3);

containerProduto.appendChild(containerImage);
containerProduto.appendChild(productDetails);
}



// Append containerProduto to the desired parent element



async function render(){
  const produto = JSON.parse(localStorage.getItem('produtoAtual'))
  const atualProduto = await getProductById(produto)
  console.log(atualProduto)
  renderProduto(atualProduto)
}

render()