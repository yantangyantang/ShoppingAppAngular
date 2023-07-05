import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  onLoginSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const LoginUserRequest = {
        password: this.password,
        username: this.username
      };

      this.http.post<any>('http://localhost:8080/auth/login', LoginUserRequest,{ withCredentials: true })
        .subscribe(
          response => {
            console.log(response);
            console.log('Login successful');
            // Update isLoggedIn property in HeaderComponent
            localStorage.setItem('isLoggedIn', 'true');
            
            const token = response.token;
            console.log(token);
            const expiryDate = new Date(response.expiryDate).getTime() / 1000; // Convert to seconds
            console.log("middle")
            localStorage.setItem("jwt", token);

            // Check if the user is an admin
            this.authService.checkAdmin().subscribe(
              isAdmin => {
                if (isAdmin) {
                  // Redirect to admin dashboard
                  this.router.navigate(['/admin-dashboard']).then(() => {
                    window.location.reload()
                  });
                } else {
                  // Redirect to regular user product page
                  this.router.navigate(['/products']).then(() => {
                    // Refresh the products page after login
                    window.location.reload();
                  });
                }
              },
              error => {
                console.error('Error checking admin status:', error);
                // Handle error if needed
              }
            );
            
            // Handle any success actions or redirect to a success page
            console.log("login end")
          },
          error => {
            console.log('Login failed');
            // Handle any error actions or display an error message
          }
        );
    } else {
      console.log('Invalid form');
      // Handle form validation errors
    }
  }
}