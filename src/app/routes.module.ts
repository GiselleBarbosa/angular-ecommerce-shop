import { Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/login/login.component';
import { CartComponent } from './modules/cart/cart.component';
import { ProductsComponent } from './modules/products/products-view/products.component';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'category/:categoryName',
    component: ProductsComponent,
  },
];

export const cartRoutes: Routes = [
  {
    path: '',
    component: CartComponent,
  },
];

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
];
