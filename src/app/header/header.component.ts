import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false; // Set the initial login status

  ngOnInit(): void {
    // Retrieve the login status from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = isLoggedIn === 'true';
  }

  // Simulated logout function
  logout(): void {
    // Perform logout logic here
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
  }
}
