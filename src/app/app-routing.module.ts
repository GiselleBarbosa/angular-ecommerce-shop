import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { AdminGuard } from './shared/guards/admin/admin.guard';
import { CartGuard } from './shared/guards/cart/cart.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },

  {
    path: 'products',
    loadChildren: () => import('./routes.module').then(module => module.productsRoutes),
  },

  {
    path: 'cart',
    loadChildren: () => import('./routes.module').then(module => module.cartRoutes),
  },

  {
    path: 'auth',
    loadChildren: () => import('./routes.module').then(module => module.authRoutes),
  },

  {
    path: 'checkout',
    loadChildren: () => import('./routes.module').then(module => module.checkoutRoutes),
    canActivate: [CartGuard],
  },

  {
    path: 'admin',
    loadChildren: () => import('./routes.module').then(module => module.adminRoutes),
    canActivate: [AdminGuard],
  },

  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
