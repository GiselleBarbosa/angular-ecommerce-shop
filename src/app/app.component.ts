import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FooterComponent } from './shared/template/footer/footer.component';
import { HeaderComponent } from './shared/template/header/header.component';
import { PrimeNGConfig } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
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
