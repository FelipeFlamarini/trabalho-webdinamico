import { addInCart } from "./addInCart.js";
import { getAllProducts } from "./allFetch.js";


async function products() {
  const produto = await getAllProducts()
  console.log(produto)
  try{

    produto.forEach(produto => {
      // Get the parent element where the card will be appended
    const parentElement = document.querySelector(".grid-layout");
  
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
  
    // Append the image element to the image container element
    imgContainer.appendChild(img);
  
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
    button.classList.add("cart-button");
    button.textContent = "adicionar ao carrinho";
    button.addEventListener("click", () => addInCart(produto));
  
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


window.onload = function() {
  products();
};

