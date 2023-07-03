import { Product } from "./Product";

export class CartItem{
    constructor(product:Product){
        this.product = product;
    }
    product:Product;
    quantity:number = 1;
    
    get price():number{
        return this.product.retail_price*this.quantity;
    }
}