import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';

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
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
