import { Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/login/login.component';
import { CartComponent } from './modules/cart/cart.component';
import { ProductsComponent } from './modules/products/products-container/products.component';
import { ProductDetailsComponent } from './modules/products/product-details/product-details.component';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'category/:categoryName',
    component: ProductsComponent,
  },

  {
    path: 'product/details/:id',
    component: ProductDetailsComponent,
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
