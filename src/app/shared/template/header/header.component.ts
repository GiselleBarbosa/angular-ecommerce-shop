import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

import { AppConfigComponent } from '../config/app.config.component';
import { BadgeModule } from 'primeng/badge';
import { CartService } from 'src/app/features/cart/services/cart.service';
import { ChangeLanguageService } from '../services/change-language.service';
import { LayoutService } from '../config/services/app.layout.service';
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
    TranslocoModule,
    AppConfigComponent,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _cartService = inject(CartService);
  private _translocoService = inject(TranslocoService);
  private _layoutService = inject(LayoutService);
  private _changeLanguageService = inject(ChangeLanguageService);

  private subscription!: Subscription;

  public totalUnits$ = this._cartService.totalUnits$;

  public ngOnInit(): void {
    this._cartService.getTotalUnits();
    const savedLanguage = localStorage.getItem('saved_language');

    if (savedLanguage) {
      this._translocoService.setActiveLang(savedLanguage);
    }
    this.getActiveLang();
  }

  public getActiveLang(): void {
    this._changeLanguageService.getActiveLang();
  }

  public changeLanguage(): void {
    this._changeLanguageService.changeLanguage();
  }

  public onConfigButtonClick(): void {
    this._layoutService.showConfigSidebar();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
