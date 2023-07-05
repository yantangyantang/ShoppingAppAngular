import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order/order.service';
import { Order} from '../shared/model/Order';
import { Router } from '@angular/router';
import { OrderItem } from '../shared/model/OrderItem';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  orders: Order[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
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
}
