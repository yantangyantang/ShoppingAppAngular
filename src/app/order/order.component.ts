import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order/order.service';
import { Order} from '../shared/model/Order';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { OrderItem } from '../shared/model/OrderItem';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  orders: Order[] = [];
  isAdmin: boolean = false;
  private baseUrl = 'http://localhost:8080';
  constructor(private orderService: OrderService, private authService : AuthService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
    this.checkAdminStatus();
  }
  checkAdminStatus(): void {
    this.authService.checkAdmin().subscribe(
      (data: boolean) => {
          this.isAdmin = data;
      },
      (error) => {
          console.error(error);
      }
    );
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error: any) => {
        console.error('Error retrieving orders:', error);
      }
    );
  }
  getStatusText(status: number): string {
    switch (status) {
      case 0:
        return 'Processing';
      case 1:
        return 'Completed';
      case 2:
        return 'Canceled';
      default:
        return 'Unknown';
    }
  }

  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
  }
  viewOrderDetails(orderId: number): void {
    const url = `order-details/${orderId}`;
    this.router.navigate([url]);
  }

  getOrderItemsByOrderId(orderId: number): void {
    this.orderService.getOrderItemsByOrderId(orderId).subscribe(
      (orderItems: OrderItem[]) => {
        // Handle the received order items
      },
      (error: any) => {
        console.error('Error retrieving order items:', error);
      }
    );
  }
  updateOrderStatus(orderId: number, status: number): void {
    const url = `${this.baseUrl}/order/${orderId}`;
    const payload = {
      order_status: status
    };
    console.log("test:" + payload);

    this.http.put(url, payload).subscribe(
      () => {
        // Order status updated successfully
        // Refresh the order list
        this.getOrders();
        //auto refresh
        window.location.reload();
      },
      (error: any) => {
        console.error('Error updating order status:', error);
      }
    );
  }
}
