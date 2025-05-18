import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { FooterComponent } from './views/footer/footer.component';
import { HeaderComponent } from './views/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private _primengConfig = inject(PrimeNGConfig);
  private _subscription!: Subscription;

  public ngOnInit(): void {
    this._primengConfig.ripple = true;

    this._primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    };
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
