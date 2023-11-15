
function addInCart(produto){
  const arrayOfIds = localStorage.getItem('productID') ? JSON.parse(localStorage.getItem('productID')) : []
  arrayOfIds.push(produto.id)
  localStorage.setItem('productID', JSON.stringify(arrayOfIds))
}


export {addInCart}