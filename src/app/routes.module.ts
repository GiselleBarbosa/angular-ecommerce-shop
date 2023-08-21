import { Routes } from '@angular/router';
import { CartComponent } from './modules/cart/cart.component';
import { ProductsComponent } from './modules/products/products-view/products.component';

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
