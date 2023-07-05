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
  cart!: Cart;
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.setCart();
    console.log("cart component onInit");
  }

  removeFromCart(cartItem: CartItem): void {
    if (!cartItem || !cartItem.product) {
      console.error('CartItem or its product is undefined');
      return;
    }
    this.cartService.removeFromCart(cartItem.product.product_id);
    this.setCart();
    this.calculateTotalPrice();
  }
  increaseQuantity(cartItem: CartItem): void {
    // Increase the quantity of the cart item
    cartItem.quantity += 1;
    this.cartService.updateCartItem(cartItem.product.product_id, cartItem.quantity);
    this.calculateTotalPrice();
  }

  decreaseQuantity(cartItem: CartItem): void {
    // Decrease the quantity of the cart item
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      this.cartService.updateCartItem(cartItem.product.product_id, cartItem.quantity);
      this.calculateTotalPrice();
    }
    else {
      this.removeFromCart(cartItem); 
    }
  }

  changeQuantity(cartItem: CartItem, quantityInstring: string): void {
    if (!cartItem || !cartItem.product) {
      console.error('CartItem or its product is undefined');
      return;
    }
    const quantity = parseInt(quantityInstring);
    this.cartService.changeQuantity(cartItem.product.product_id, quantity);
    this.setCart();
    this.calculateTotalPrice();
  }

  setCart() {
    this.cart = this.cartService.getCart() || new Cart();
    this.calculateTotalPrice(); 
  }

  purchase(): void {
    if (this.cartService.getCart().items.length === 0) {
      console.log('Cart is empty. Cannot proceed with the purchase.');
      return;
    }

    this.cartService.purchase().subscribe(
      (response: any) => {
        console.log('Order placed!', response);
        this.cartService.cleanCart();
        this.setCart();
        this.calculateTotalPrice();
      },
      (error: any) => {
        console.error('Error during purchasing:', error);
      }
    );
  }

  calculateTotalPrice(): void {
    console.log('Cart items from component:', this.cart.items);
    this.totalPrice = this.cart.items.reduce((total, cartItem) => total + cartItem.price, 0);
  }
}


