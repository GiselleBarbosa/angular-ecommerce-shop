import { CartComponent } from './modules/cart/cart.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ProductDetailsComponent } from './modules/products/product-details/product-details.component';
import { ProductsComponent } from './modules/products/products-container/products.component';
import { Routes } from '@angular/router';

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

export const checkoutRoutes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
  },
];
