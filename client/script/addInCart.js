function addInCart(id){
  const arrayOfIds = localStorage.getItem('productID') ? JSON.parse(localStorage.getItem('productID')) : []
  arrayOfIds.push(id)
  localStorage.setItem('productID', JSON.stringify(arrayOfIds))
}


export {addInCart}