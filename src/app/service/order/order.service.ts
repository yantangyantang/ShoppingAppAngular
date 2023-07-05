import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/model/Order';
import { OrderItem } from 'src/app/shared/model/OrderItem';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:8080/orders';
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }
  getOrderItemsByOrderId(orderId: number): Observable<OrderItem[]> {
    const url = `${this.baseUrl}/orderDetails/${orderId}`;
    return this.http.get<OrderItem[]>(url);
  }
  
}
