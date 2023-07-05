import { Injectable } from '@angular/core';
import { Cart } from 'src/app/shared/model/Cart';
import { CartItem } from 'src/app/shared/model/CartItem';
import { Product } from 'src/app/shared/model/Product';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = new Cart();
  private storageKey = 'cart';
  private apiUrl = 'http://localhost:8080/order';

  constructor(private http: HttpClient) {
    const cartData = localStorage.getItem(this.storageKey);
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }
  

  addToCart(product: Product): void {
    // Check if item already in cart
    if (!product || !product.product_id) {
      console.error('Product is undefined');
      return;
    }
    let cartItem = this.cart.items.find(item => item.product.product_id === product.product_id);
    // let cartItem = this.cart.items.find(item => {
    //   console.log("product.product_id" + product.product_id);
    //   console.log("item.product.product_id" + item.product.product_id);
    //   console.log('Comparing:', item.product.product_id, product.product_id);
    //   return item.product.product_id === product.product_id;
    // });
    // console.log('Cart item:', cartItem);
    if (cartItem) {
      this.changeQuantity(product.product_id, cartItem.quantity + 1);
      this.updateCartStorage();
      return;
    }
    this.cart.items.push(new CartItem(product));
    this.updateCartStorage();
  }

  // removeFromCart(productId:number):void{

  //   this.cart.items = this.cart.items.filter(item => item.product.product_id !== productId);
  //   this.updateCartStorage(); 
  // }

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
  purchase():Observable<any> {
    // Check if the cart is empty
    if (this.cart.items.length === 0) {
      console.log('Cart is empty. Cannot proceed with the purchase.');
      return EMPTY;
    }
    const payload: { productId: number; purchasePrice:number; wholesalePrice:number; quantity: number }[] = this.cart.items.map(item => {
      return {
        productId: item.product.product_id,
        purchasePrice: item.product.retail_price,
        wholesalePrice:item.product.wholesale_price,
        quantity: item.quantity
      };
    });
    console.log('Payload:', payload);
    return this.http.post<any>(this.apiUrl, payload);

    // return this.http.post<any>(this.apiUrl, this.cart);
  }
  cleanCart(): void {
    this.cart = new Cart();
    this.updateCartStorage();
  }
}
