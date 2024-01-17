import { AdminGuard } from './core/guards/admin/admin.guard';
import { AdministratorComponent } from './features/administrator/administrator.component';
import { CartComponent } from './features/cart/cart.component';
import { CartGuard } from './core/guards/cart/cart.guard';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { CreateComponent } from './features/auth/create/create.component';
import { FirstStepComponent } from './features/checkout/components/first-step/first-step.component';
import { LoginComponent } from './features/auth/login/login.component';
import { LogoutComponent } from './features/auth/logout/logout.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';
import { ProductsComponent } from './features/products/products-container/products.component';
import { Routes } from '@angular/router';
import { SecondStepComponent } from './features/checkout/components/second-step/second-step.component';
import { ThirdStepComponent } from './features/checkout/components/third-step/third-step.component';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    title: 'Home page',
  },

  {
    path: 'category/:categoryName',
    component: ProductsComponent,
    title: 'Products by category page',
  },

  {
    path: 'product/details/:id',
    component: ProductDetailsComponent,
    title: 'Detail product',
  },
];

export const cartRoutes: Routes = [
  {
    path: '',
    component: CartComponent,
    title: 'Cart page',
  },
];

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page',
  },

  {
    path: 'logout',
    component: LogoutComponent,
    title: 'Logout page',
  },

  {
    path: 'create',
    component: CreateComponent,
    title: 'Register page',
  },
];

export const checkoutRoutes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    title: 'Checkout page',
    canActivate: [CartGuard],

    children: [
      {
        path: 'first-step',
        component: FirstStepComponent,
        canActivate: [CartGuard],
      },
      {
        path: 'second-step',
        component: SecondStepComponent,
        canActivate: [CartGuard],
      },
      {
        path: 'third-step',
        component: ThirdStepComponent,
        canActivate: [CartGuard],
      },
    ],
  },
];

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    title: 'Admin page',
    canActivate: [AdminGuard],
  },
];
