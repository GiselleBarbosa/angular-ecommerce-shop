import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { BadgeModule } from 'primeng/badge';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { MegaMenuModule } from 'primeng/megamenu';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Subscription } from 'rxjs';
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
    SidebarComponent,
  ],
  template: `<p-toolbar styleClass="align-items-center pt-0 pb-0">
    <div class="p-toolbar-group-start gap-4">
      <h4 class="cursor-pointer" style="color: var(--primary-color)" routerLink="/">
        Angular e-commerce
      </h4>
    </div>

    <div class="p-toolbar-group-end mb-4 gap-5 md: mt-4 flex-wrap">
      <ng-container *ngIf="totalUnits$ | async as total; else emptyCart">
        <i
          style="font-size: 2rem; color: var(--primary-color)"
          pBadge
          value="{{ total }}"
          class="icon pi pi-shopping-cart mr-2 cursor-pointer"
          routerLink="cart"></i>
      </ng-container>

      <ng-template #emptyCart>
        <i
          style="font-size: 2rem; color: var(--primary-color)"
          class="icon pi pi-shopping-cart mr-2 cursor-pointer"
          routerLink="cart"></i>
      </ng-template>

      <app-sidebar />
    </div>
  </p-toolbar> `,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _cartService = inject(CartService);

  private subscription!: Subscription;

  public setButtonTheme!: boolean;
  public currentTheme!: string;

  public totalUnits$ = this._cartService.totalUnits$;

  public ngOnInit(): void {
    this._cartService.getTotalUnits();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
