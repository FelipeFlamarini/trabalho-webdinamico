//criar um objeto com o tanto de vezes que foi adicionadol
function addInCart(produto){
  const arrayOfIds = localStorage.getItem('productID') ? JSON.parse(localStorage.getItem('productID')) : []
  
  const found = arrayOfIds.find(produtoLocal => produtoLocal.id === produto.id);

  if(found){
    found.quantity += 1;
  } else {
    arrayOfIds.push({
      id: produto.id,
      quantity: 1
    });
  }
  
  localStorage.setItem('productID', JSON.stringify(arrayOfIds))
}


export {addInCart}