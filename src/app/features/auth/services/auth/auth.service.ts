import { inject, Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _router = inject(Router);

  public isLoggedIn!: boolean;

  public showAdminIcon!: boolean;

  constructor() {
    const isUserLoggedIn = localStorage.getItem('saved_user_loggedIn');
    const isAdminLoggedIn = localStorage.getItem('saved_admin_loggedIn');

    if (isUserLoggedIn) {
      this.isLoggedIn = JSON.parse(isUserLoggedIn);
    } else if (isAdminLoggedIn) {
      this.isLoggedIn = JSON.parse(isAdminLoggedIn);
    }

    if (isAdminLoggedIn) {
      this.showAdminIcon = true;
    } else {
      this.showAdminIcon = false;
    }
  }

  public logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('saved_user_loggedIn');
    localStorage.removeItem('saved_admin_loggedIn');
    this._router.navigate(['/auth/logout']);
  }

  public login(): boolean {
    return (this.isLoggedIn = true);
  }
}
