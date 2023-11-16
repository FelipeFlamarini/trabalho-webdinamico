async function checkout() {
    const cart = JSON.parse(localStorage.getItem('productID'));
    const ids = cart.map((product) => {
        return product.id;
    });
    console.log(ids);
    await cartCheckout(JSON.stringify(ids));
    localStorage.clear();
}