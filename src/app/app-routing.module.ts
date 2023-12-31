import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { OrderComponent } from './order/order.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [ 
  { path: 'register-page', component: RegisterPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'order', component:OrderComponent},
  { path: 'orders', component:OrderComponent},
  { path: 'order-details/:orderId', component: OrderItemsComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'products', component: ProductsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
