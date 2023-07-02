import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}
  onLoginSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const LoginUserRequest = {
        password: this.password,
        username: this.username
      };

      this.http.post<any>('http://localhost:8080/auth/login', LoginUserRequest)
        .subscribe(
          response => {
            console.log('Login successful');
            // Handle any success actions or redirect to a success page
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
