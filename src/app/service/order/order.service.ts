import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }
}
