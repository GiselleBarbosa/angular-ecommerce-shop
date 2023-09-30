import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';

import { BadgeModule } from 'primeng/badge';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { MegaMenuModule } from 'primeng/megamenu';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ThemeService } from 'src/app/core/services/theme/theme.service';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ToolbarModule,
    NgIf,
    RouterLink,
    SplitButtonModule,
    MegaMenuModule,
    SidebarComponent,
    AsyncPipe,
    BadgeModule,
  ],
  template: `<p-toolbar styleClass="align-items-center pt-0 pb-0">
    <div class="p-toolbar-group-start">
      <h1 class="cursor-pointer" routerLink="/">Angular Shopping</h1>
      <app-sidebar class="ml-5" />
    </div>

    <div class="p-toolbar-group-end mb-4 gap-5 md: mt-4 flex-wrap">
      <i
        pBadge
        value="{{ totalUnits$ | async }}"
        class="icon pi pi-shopping-cart mr-2 cursor-pointer"
        routerLink="cart"></i>
      <div (click)="toggleTheme()" class="flex cursor-pointer">
        <i class="icon pi pi-sun mr-2" *ngIf="setButtonTheme"></i>
        <i class="icon pi pi-moon mr-2" *ngIf="!setButtonTheme"></i>
      </div>
    </div>
  </p-toolbar> `,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _themeService = inject(ThemeService);
  private _cartService = inject(CartService);

  private subscription!: Subscription;

  public setButtonTheme!: boolean;
  public currentTheme!: string;

  public totalUnits$ = this._cartService.totalUnits$;

  public ngOnInit(): void {
    this._cartService.getTotalUnits();
  }

  public toggleTheme(): void {
    this._themeService.theme$.pipe(take(1)).subscribe(theme => {
      this.currentTheme = theme;

      this.setButtonTheme = theme === 'light' ? true : false;
    });

    this._themeService.toggleTheme();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
