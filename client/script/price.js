class PriceCalculator {
  constructor() {
    this.totalPrice = 0;
  }

  addPrice(preco,quantity) {
    this.totalPrice += (preco*quantity)
  }

  getTotalPrice() {
    return this.totalPrice.toFixed(2)
  }
}


export  {PriceCalculator};