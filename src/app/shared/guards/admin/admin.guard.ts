/* eslint-disable no-unused-vars */

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private router = inject(Router);
  private _authService = inject(AuthService);

  public canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const adminToken = Boolean(localStorage.getItem('saved_admin_loggedIn'));
    const isLoggedIn = this._authService.isLoggedIn;

    if (adminToken) {
      return true;
    } else if (!adminToken && isLoggedIn) {
      this._authService.isLoggedIn = false;
      this._authService.logout();
      return false;
    } else {
      this.router.navigate(['/auth/login']);
    }
    return false;
  }
}
