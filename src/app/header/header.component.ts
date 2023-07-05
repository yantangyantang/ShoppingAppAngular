// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {
//   isLoggedIn: boolean = false; // Set the initial login status
//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit(): void {
//     // Retrieve the login status from localStorage
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     this.isLoggedIn = isLoggedIn === 'true';
//   }

//   // Simulated logout function
//   logout(): void {
//     this.http.post('http://localhost:8080/auth/logout', {}).subscribe(
//       response => {
//         console.log("storage before logout: " + localStorage.length );
//         localStorage.removeItem('isLoggedIn');
//         localStorage.removeItem('jwt');
//         this.isLoggedIn = false;
//         this.router.navigate(['/login']); // Redirect to /auth/login page
//         console.log("storage after logout: " + localStorage.length );
//       },
//       error => {
//         console.error('Logout failed', error);
//       }
//     )
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OrderService } from '../service/order/order.service';
import { Order } from '../shared/model/Order';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false; // Set the initial login status
  isAdmin: boolean = false; // Set the initial admin status
  orders: Order[] = [];
  constructor(private http: HttpClient, private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    // Retrieve the login status from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = isLoggedIn === 'true';

    // Retrieve the admin status from the server
    this.http.get<boolean>('http://localhost:8080/isAdmin').subscribe(
      isAdmin => {
        this.isAdmin = isAdmin;
      },
      error => {
        console.error('Failed to retrieve admin status:', error);
      }
    );
  }

  logout(): void {
    this.http.post('http://localhost:8080/auth/logout', {}).subscribe(
      response => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('jwt');
        localStorage.removeItem('isAdmin');
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }
  getOrders(): void {
    this.orderService.getOrders().subscribe(
      orders => {
        this.orders = orders;
      },
      error => {
        console.error('Error retrieving orders:', error);
      }
    );
  }
}