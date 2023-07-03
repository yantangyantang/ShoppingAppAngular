import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart/cart.service';
import { Cart } from '../shared/model/Cart';
import { CartItem } from '../shared/model/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart!:Cart;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.setCart();
    console.log("cart component onInit");
  }
  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.product.product_id);
    this.setCart();
  }
  changeQuantity(cartItem:CartItem, quantityInstring:string) {
    const quantity = parseInt(quantityInstring);
    this.cartService.changeQuantity(cartItem.product.product_id, quantity);
    this.setCart();
  }
  setCart() {
    this.cart = this.cartService.getCart() || new Cart();
  }

}
