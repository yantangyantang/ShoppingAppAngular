import { Product } from './Product';

export class OrderItem {
  id: number;
  quantity: number;
  purchasePrice: number;
  product: Product;

  constructor(id: number, quantity: number, purchasePrice: number, product: Product) {
    this.id = id;
    this.quantity = quantity;
    this.purchasePrice = purchasePrice;
    this.product = product;
  }
}
