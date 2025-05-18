import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { MegaMenuModule } from 'primeng/megamenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { LayoutService } from '../../services/layout/app.layout.service';
import { AppConfigComponent } from '../config/app.config.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

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
    AppConfigComponent,
    TooltipModule,
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
