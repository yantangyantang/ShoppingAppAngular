import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegisterSubmit(registerForm: NgForm): void {
    if (registerForm.valid) {
      const registerUserRequest = {
        email: this.email,
        password: this.password,
        username: this.username
      };

      this.http.post<any>('http://localhost:8080/register', registerUserRequest)
        .subscribe(
          response => {
            console.log('Registration successful');
            this.router.navigate(['/login']);
            // Handle any success actions or redirect to a success page
          },
          error => {
            console.log('Registration failed');
            // Handle any error actions or display an error message
          }
        );
    } else {
      console.log('Invalid form');
      // Handle form validation errors
    }
  }
}