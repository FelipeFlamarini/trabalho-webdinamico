class PriceCalculator {
  constructor() {
    this.totalPrice = 0;
  }

  addPrice(individualPrice) {
    this.totalPrice += individualPrice;
  }

  getTotalPrice() {
    return this.totalPrice.toFixed(2);
  }
}


export  {PriceCalculator,};