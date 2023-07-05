import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080'; // Replace with your backend base URL

  constructor(private http: HttpClient) {}

  // Other authentication methods...

  checkAdmin(): Observable<boolean> {
    const url = `${this.baseUrl}/isAdmin`;
    return this.http.get<boolean>(url);
  }
}
