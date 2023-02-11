export default class OrderRow {
  public price: number;
  public vat_rate: number;
  public quantity: number;

  constructor(price: number, vat_rate: number, quantity: number) {
    this.price = price;
    this.vat_rate = vat_rate;
    this.quantity = quantity;
  }

  public amount(): number { 
    return this.price * this.quantity;
  }

  public vat(): number {
    return this.amount() * this.vat_rate;
  }
}