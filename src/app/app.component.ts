import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { AppConfigComponent } from './shared/config/app.config.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    AppConfigComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
  template: `
    <p-toast />
    <p-confirmDialog />

    <app-header />

    <div class="p-5 mb-8" style="min-height: 73vh">
      <router-outlet />
    </div>

    <app-config />

    <div class="bottom-0" style="width: 100%">
      <app-footer />
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private primengConfig = inject(PrimeNGConfig);
  private subscription!: Subscription;

  public setButtonTheme!: boolean;

  public ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    };
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
