import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products/products.service';
import { Product } from '../shared/model/Product';
import { CartService } from '../service/cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  // ngOnInit(): void {
  //   this.productsService.getFoods().subscribe(
  //     (foods: Food[]) => {
  //       this.foods = foods;
  //     },
  //     (error) => {
  //       console.error('Error fetching products:', error);
  //     }
  //   );
  // }
}

// @Component({
//   selector: 'app-products',
//   templateUrl: './products.component.html',
//   styleUrls: ['./products.component.css']
// })
// export class ProductsComponent implements OnInit {
//   products:Food[] = [];
//   constructor(private productsService : ProductsService, private cartService : CartService) {}

//   addToCart(product: any): void {
//     this.cartService.addToCart(product);
//   }

//   ngOnInit(): void{
//     this.products = this.productsService.getAll();
//   }

// }
