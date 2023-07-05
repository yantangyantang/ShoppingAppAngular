import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderItem } from '../shared/model/OrderItem';
import { OrderService } from '../service/order/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent {
  orderItems: OrderItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orderId = +params['orderId'];
      this.getOrderItemsByOrderId(orderId);
    });
  }

  getOrderItemsByOrderId(orderId: number): void {
    this.orderService.getOrderItemsByOrderId(orderId).subscribe(
      (orderItems: OrderItem[]) => {
        this.orderItems = orderItems;
      },
      (error: any) => {
        console.error('Error retrieving order items:', error);
      }
    );
  }
}
