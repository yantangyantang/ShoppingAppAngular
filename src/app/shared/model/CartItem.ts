import { Product } from "./Product";

export class CartItem{
    constructor(product:Product){
        this.product = product;
    }
    product:Product;
    quantity:number = 1;
    
    get price():number{
        console.log('Product retail price:', this.product.retail_price);
        console.log('Quantity:', this.quantity);
        return this.product.retail_price*this.quantity;
    }
}