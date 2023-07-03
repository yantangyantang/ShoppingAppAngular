import { NgClass } from '@angular/common';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/model/Product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private apiUrl = 'http://localhost:8080/products'; 

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
// export class ProductsService {

//   constructor() { }

//   //add getAll function and provide path to the images
//   getAll():Food[] {
//     return [{
//       id: 1,
//       name: 'Rasberry',
//       price: 1,
//       // favorite: false,
//       // stars: 4.5,
//       origins: ['North Carolina'],
//       imageUrl:'/assets/images/1.jpeg',
//       tags:['Organic', 'Fruit'],
//     }, 
//     {
//       id: 2,
//       name: 'Blueberry Tart',
//       price: 1,
//       // favorite: false,
//       // stars: 4.7,
//       origins: ['North Carolina'],
//       imageUrl:'/assets/images/4.jpeg',
//       tags:['Organic', 'Breakfast'],
//     },
//     {
//       id: 3,
//       name: 'Apple',
//       price: 1,
//       // favorite: false,
//       // stars: 4.7,
//       origins: ['North Carolina'],
//       imageUrl:'/assets/images/apple_r.jpeg',
//       tags:['Organic', 'Fruit'],
//     },
//     {
//       id: 4,
//       name: 'Cereal',
//       price: 1,
//       // favorite: false,
//       // stars: 4.7,
//       origins: ['North Carolina'],
//       imageUrl:'/assets/images/cereal.jpeg',
//       tags:['Organic', 'Breakfast'],
//     },
//     {
//       id: 5,
//       name: 'Strawberry',
//       price: 1,
//       // favorite: false,
//       // stars: 4.7,
//       origins: ['North Carolina'],
//       imageUrl:'/assets/images/strawberry.jpeg',
//       tags:['Organic', 'Fruit'],
//     },
//     {
//       id: 6,
//       name: 'Honey',
//       price: 1,
//       // favorite: false,
//       // stars: 4.7,
//       origins: ['North Carolina'],
//       imageUrl:'/assets/images/6.jpg',
//       tags:['Organic'],
//     },
//     {
//       id: 7,
//       name: 'Blueberry',
//       price: 1,
//       // favorite: false,
//       // stars: 4.7,
//       origins: ['North Carolina'],
//       imageUrl:'/assets/images/5.jpeg',
//       tags:['Organic', 'Fruit'],
//     },
//     {
//       id: 8,
//       name: 'Pancake',
//       price: 1,
//       // favorite: false,
//       // stars: 4.7,
//       origins: ['North Carolina'],
//       imageUrl:'/assets/images/3.jpeg',
//       tags:['Organic', 'Breakfast'],
//     },
//     {
//       id: 9,
//       name: 'Pizza',
//       price: 1,
//       // favorite: false,
//       // stars: 4.7,
//       origins: ['North Carolina'],
//       imageUrl:'/assets/images/pizza-whole.jpg',
//       tags:['Organic', 'Meal'],
//     },
//     {
//       id: 10,
//       name: 'Cake',
//       price: 1,
//       // favorite: false,
//       // stars: 4.7,
//       origins: ['North Carolina'],
//       imageUrl:'/assets/images/cake.jpeg',
//       tags:['Organic', 'Birthday'],
//     },
//     ]
//   }
// }








