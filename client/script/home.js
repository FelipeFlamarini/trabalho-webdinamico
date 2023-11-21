import {
  getProductsMostViewed,
  getProductsMostSold,
  getProductsLeastStock,
  getProductsByUniverseLimit,
} from "./allFetch.js";
import { Breakpoints } from "../../node_modules/@glidejs/glide/dist/glide.modular.esm.js";

async function teste() {
  const ids = ["maisVendidos", "marvel"];
  await Promise.all(
    ids.map(async (id) => {
      document.querySelector(`#${id}`).innerHTML += `
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides"></ul>
            </div>
            <div class="glide__bullets" data-glide-el="controls[nav]"></div>`;
    })
  );
}

async function updateMostViewed(limit) {
  await getProductsMostViewed(limit).then((products) => {
    createCards(products, "#maisVistos");
  });
}

async function updateMostSold(limit) {
  await getProductsMostSold(limit).then((products) => {
    createCards(products, "#maisVendidos");
  });
}

async function updateLeastStock(limit) {
  await getProductsLeastStock(limit).then((products) => {
    createCards(products, "#menosEstoque");
  });
}

async function updateMarvel(limit) {
  await getProductsByUniverseLimit("Marvel", limit).then((products) => {
    createCards(products, "#marvel");
  });

}

async function createCards(products, idName) {
  await products.forEach((product, index) => {
    const li = document.createElement("li");
    li.classList.add("glide__slide");
    li.classList.add("card");

    li.innerHTML = `
            <a href="./produto.html?id=${product.id}">
                <div class="product">
                  <div class="productImage">
                    <img src="http://localhost:3000/api/productImagesTransparent/${
                      product.id
                    }/1.jpg" alt="${product.nome}">
                  </div>
                  <div class=productInfo>
                      <h3>${product.nome.split(/(!)/)[0]}!</h3>
                      <h3>${product.nome.split(/(!)/)[2]}</h3>
                      <p>R$ ${product.preco}</p>
                  </div>
                </div>
            </a>
        `;

    document.querySelector(`${idName} .glide__slides`).appendChild(li);
    document.querySelector(
      `${idName} .glide__bullets`
    ).innerHTML += `<button class="glide__bullet" data-glide-dir="=${index}">
                <i class="fa-solid fa-circle"></i>
            </button>
        `;
  });
  new Glide(document.querySelector(idName), {
    type: "carousel",
    perView: 5,
    breakpoints: {
      1440: {
        perView: 4,
      },
      1200: {
        perView: 3,
      },
      950: {
        perView: 2,
      },
      625: {
        perView: 1,
      },
    },
    gap: 15,
    autoplay: 5000,
    focusAt: "center",
  }).mount({ Breakpoints });

  const slides = document.querySelectorAll(
    `${idName} .glide__track .glide__slide.card:not(.glide__slide--clone)`
  );
  const bullets = document.querySelectorAll(`${idName} .glide__bullet`);
  const observer = new MutationObserver((mutations) => {
    slides.forEach((slide, index) => {
        if (slide.classList.contains("glide__slide--active")) {
            bullets.forEach((bullet) => {
                bullet.classList.remove("active");
                });
                bullets[index].classList.add("active");
        }
    });
  });
  observer.observe(slides[0], { attributes: true });
}
// updateRecommended();
teste().then(() => {
  updateMostSold(8);
  updateMarvel(8);
  // updateMostViewed(10);
  // updateLeastStock(10);
});