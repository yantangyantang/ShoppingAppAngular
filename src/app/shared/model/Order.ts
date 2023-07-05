export class Order {
    order_id: number;
    datePlaced: string;
    order_status: number;
    user_id: number;
    // Add other properties as needed
  
    constructor(order_id: number, datePlaced: string, order_status: number, user_id: number) {
      this.order_id = order_id;
      this.datePlaced = datePlaced;
      this.order_status = order_status;
      this.user_id = user_id;
    }
  }
  
  
  
  