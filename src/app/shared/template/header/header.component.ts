import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { AppConfigComponent } from '../config/app.config.component';
import { BadgeModule } from 'primeng/badge';
import { CartService } from 'src/app/features/cart/services/cart.service';
import { LayoutService } from '../config/services/app.layout.service';
import { MegaMenuModule } from 'primeng/megamenu';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Subscription } from 'rxjs';
import { ToolbarModule } from 'primeng/toolbar';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
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
    TranslocoModule,
    AppConfigComponent,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _cartService = inject(CartService);
  private _layoutService = inject(LayoutService);

  private subscription!: Subscription;

  public totalUnits$ = this._cartService.totalUnits$;

  public ngOnInit(): void {
    this._cartService.getTotalUnits();
  }

  public onConfigButtonClick(): void {
    this._layoutService.showConfigSidebar();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
