import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false; // Set the initial login status
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the login status from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = isLoggedIn === 'true';
  }

  // Simulated logout function
  logout(): void {
    this.http.post('http://localhost:8080/auth/logout', {}).subscribe(
      response => {
        console.log("storage before logout: " + localStorage.length );
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('jwt');
        this.isLoggedIn = false;
        this.router.navigate(['/login']); // Redirect to /auth/login page
        console.log("storage after logout: " + localStorage.length );
      },
      error => {
        console.error('Logout failed', error);
      }
    )
  }
}
