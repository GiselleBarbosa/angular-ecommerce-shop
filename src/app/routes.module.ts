import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';
import { ProductsComponent } from './features/products/products-container/products.component';
import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    data: { title: 'Home page' },
  },

  {
    path: 'category/:categoryName',
    component: ProductsComponent,
    data: { title: 'Products by category page' },
  },

  {
    path: 'product/details/:id',
    component: ProductDetailsComponent,
    data: { title: 'Detail product' },
  },
];

export const cartRoutes: Routes = [
  {
    path: '',
    component: CartComponent,
    data: { title: 'Cart page' },
  },
];

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login page' },
  },
];

export const checkoutRoutes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    data: { title: 'Checkout page' },
  },
];
