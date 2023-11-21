import { addInCart } from "./addInCart.js";
import { getAllProducts,GetProductByPrice,GetProductByUniverse } from "./allFetch.js";

async function products(param = getAllProducts()) {
  const produto = await param
  console.log(produto)
  try{

    const parentElement = document.querySelector(".grid-layout");
    parentElement.innerHTML = ""
    produto.forEach(produto => {
      // Get the parent element where the card will be appended
    
    // Create the card container element
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("produto");
  
    // Create the image container element
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
  
    // Create the image element
    const img = document.createElement("img");
    img.src = `http://localhost:3000/api/productImages/${produto.id}/1.jpg`;
    img.alt = produto.nome;
    img.classList.add("main-image")
  
    const secondimg = document.createElement("img")
    secondimg.src = `http://localhost:3000/api/productImages/${produto.id}/2.jpg`;
    secondimg.alt = produto.nome + " in box";
    secondimg.classList.add("box-image")
    // Append the image element to the image container element
    imgContainer.appendChild(img);
    imgContainer.appendChild(secondimg)
  
    const allDetails = document.createElement("div")
    allDetails.classList.add("all-details")

    // Create the details container element
    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details");
  
    // Create the brand element
    const brand = document.createElement("span");
    brand.textContent = produto.universo;
  
    // Create the name element
    const name = document.createElement("span");
    name.textContent = produto.nome;
  
    // Create the price element
    const price = document.createElement("span");
    price.textContent =`$${produto.preco}` ;
  
    // Create the button element
    const button = document.createElement("button");

    const div2button = document.createElement("div")
    const div2Span = document.createElement("span")
    div2Span.textContent ="Adicionar ao Carrinho"
    div2button.appendChild(div2Span)

    const arrayOfIds = localStorage.getItem('productID') ? JSON.parse(localStorage.getItem('productID')) : []
    // console.log(arrayOfIds)
    arrayOfIds.forEach((purchasedProduct)=>{
      // console.log("mesmo produto")
      if(purchasedProduct.id == produto.id){
        button.classList.remove("primary-button")
        button.classList.add("cart-button")
        div2button.style.pointerEvents = 'none'
        div2Span.textContent= "Adicionado"
      }
    })

    if(button.className !== "cart-button"){
      button.classList.add("primary-button")
    }

    div2button.addEventListener("click",() =>{
      if(button.className === "primary-button"){
        button.classList.remove("primary-button")
        button.classList.add("cart-button")
      }
      
      select.value = 1;

      div2Span.textContent = "Adicionado"
    })


  const purchasedProduct = arrayOfIds.find(item => item.id == produto.id);
  const valueSelect = purchasedProduct ? purchasedProduct.quantity : undefined;
  // console.log(valueSelect);

    const div1button = document.createElement("div")
    const select = document.createElement("select")

    select.addEventListener("change",(ev)=>{
      const arrayOfIds = localStorage.getItem('productID') ? JSON.parse(localStorage.getItem('productID')) : []
      
      const found = arrayOfIds.find(produtoLocal => produtoLocal.id === produto.id);
      
      if(found){
        found.quantity = +ev.target.value;
        localStorage.setItem('productID', JSON.stringify(arrayOfIds))
      }
    
    })

    for (let index = 1; index < 16; index++) {
      const option = document.createElement('option');
      option.setAttribute('value', index);
      option.textContent = index
      // console.log(valueselect)
      if (index == valueSelect) {
        console.log(index)
        option.setAttribute('selected', 'selected');
      }

      select.appendChild(option);
    }

    div1button.appendChild(select)


    const div3button = document.createElement("div")
    const div3img = document.createElement ("img")
    div3img.src= "./img/trash.svg"
    div3button.appendChild(div3img)
    div3button.addEventListener("click",() =>{
      // console.log("a")
      div2button.style.pointerEvents = 'auto'
      button.style.border = "1px solid red"
      button.classList.remove("cart-button")
      button.classList.add("primary-button")
      div2Span.textContent ="Adicionar ao Carrinho"
      const arrayOfIds = localStorage.getItem('productID') ? JSON.parse(localStorage.getItem('productID')) : []
      const filterArray = arrayOfIds.filter( p => p.id !== produto.id)
  
      localStorage.setItem('productID', JSON.stringify(filterArray))
    })

    
    div2button.addEventListener("click", () => {
      console.log("entrei")
      addInCart(produto)
      div2button.style.pointerEvents = 'none'
    })
    
    button.append(div1button,div2button,div3button)
    
    // Append the brand, name, price, and button elements to the details container element
    detailsContainer.appendChild(brand);
    detailsContainer.appendChild(name);
    detailsContainer.appendChild(price);

    allDetails.appendChild(detailsContainer)
    allDetails.appendChild(button)

    // Append the image container and details container elements to the card container element
    cardContainer.appendChild(imgContainer);
    cardContainer.appendChild(allDetails);
  
    // Append the card container element to the parent element
    parentElement.appendChild(cardContainer);
  
    });
  }catch(err){
    console.log(err)
  }
  
}



const checkboxes = document.querySelectorAll('input[name="filtro"]');
checkboxes.forEach(checkbox =>{
  checkbox.addEventListener("click",(ev)=>{
    uncheckOthers(ev.target)
    if(ev.target.value && ev.target.checked){
      console.log("ABGGA")
      console.log(ev.target.value)
      selectFilter(ev.target.value)
      return localStorage.setItem("filtro", JSON.stringify(ev.target.value));
    }
    selectFilter('default')
    return localStorage.setItem("filtro",JSON.stringify('default'))
  })
})

function uncheckOthers(clickedCheckbox) {
  // Obtém todos os checkboxes dentro do mesmo grupo
  const checkboxes = document.querySelectorAll('input[name="filtro"]');
  
  // Desmarca os outros checkboxes, exceto o clicado
  checkboxes.forEach(checkbox => {
      if (checkbox !== clickedCheckbox) {
          checkbox.checked = false;
      }
  });
}

function selectFilter(param){
  switch (param){
    case 'Marvel':
      products(GetProductByUniverse('Marvel'))
      break;
    case 'precoASC':
      products(GetProductByPrice("ASC"))
      break;
    case 'precoDESC':
      products(GetProductByPrice('DESC'))
      break;
    case 'default':
      products(getAllProducts())
    // default:
    //   products(getAllProducts())
    //   console.log("default caiu")
  }
}

function savedFilter(){
  const savedFilter = JSON.parse(localStorage.getItem("filtro"));
  if (savedFilter && savedFilter !== 'default') {
    // Seleciona o checkbox correspondente ao filtro salvo
    const checkbox = document.querySelector(`input[value="${savedFilter}"]`);
    if (checkbox) {
      checkbox.checked = true;
      // Chama a função selectFilter para aplicar o filtro salvo
      return selectFilter(savedFilter);
    }
  }
  selectFilter(savedFilter)
}

window.onload = function() {
  savedFilter()
};

