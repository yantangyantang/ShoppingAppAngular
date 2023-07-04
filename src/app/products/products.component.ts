import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products/products.service';
import { Product } from '../shared/model/Product';
import { CartService } from '../service/cart/cart.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    // console.log("onInit test");
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe(
      (products: Product[]) => {
        // console.log('Received products in component:', products);
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(product: Product): void {
    console.log('Product for testing:', product); // Check if the product object is defined
    this.cartService.addToCart(product);
  }

  addToWatchlist(product: Product): void {
    this.productsService.addToWatchlist(product)
      .pipe(
        catchError((error: any) => {
          console.error('Failed to add product to watchlist', error);
          // Handle error case
          return of(null); // Return an observable with null value to prevent the error from propagating further
        })
      )
      .subscribe(() => {
        console.log('Product added to watchlist successfully');
        // Perform any additional actions after adding to watchlist
      });
  }
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
// }

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
