/* eslint-disable no-unused-vars */

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { inject, Injectable } from '@angular/core';

import { CartService } from 'src/app/features/cart/services/cart.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartGuard implements CanActivate {
  private router = inject(Router);
  private _cartService = inject(CartService);

  public canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cartLength = this._cartService.cart.length;

    if (cartLength > 0) {
      return true;
    } else {
      this.router.navigate(['/products']);
      return false;
    }
  }
}
