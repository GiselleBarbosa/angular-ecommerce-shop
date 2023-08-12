import { Routes } from '@angular/router';
import { ProductsComponent } from './modules/products/products.component';
import { CartComponent } from './modules/cart/cart.component';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
];

export const cartRoutes: Routes = [
  {
    path: '',
    component: CartComponent,
  },
];
