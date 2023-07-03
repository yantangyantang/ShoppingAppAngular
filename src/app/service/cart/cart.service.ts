import { Injectable } from '@angular/core';
import { Cart } from 'src/app/shared/model/Cart';
import { CartItem } from 'src/app/shared/model/CartItem';
import { Product } from 'src/app/shared/model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = new Cart();
  private storageKey = 'cart';

  constructor() {
    const cartData = localStorage.getItem(this.storageKey);
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  addToCart(product:Product):void{
    // check if item already in cart
    let cartItem = this.cart.items.find(item => item.product.product_id == product.product_id); 
    console.log("cart service  addtocart1")
    if(cartItem){
      this.changeQuantity(product.product_id, cartItem.quantity + 1);
      console.log("cart service  addtocart2");
      this.updateCartStorage(); 
      return;
    }
    console.log("cart service  addtocart3")
    this.cart.items.push(new CartItem(product));
    this.updateCartStorage(); 
  }

  removeFromCart(productId:number):void{
    this.cart.items = 
    this.cart.items.filter(item => item.product.product_id != productId);
    this.updateCartStorage(); 
  }

  changeQuantity(productId:number, quantity:number) {
    let cartItem = this.cart.items.find(item => item.product.product_id === productId);
    if(!cartItem) return;
    cartItem.quantity = quantity;
    this.updateCartStorage(); 
  }
  getCart():Cart{
    return this.cart;
  }
  private updateCartStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
  }
}
