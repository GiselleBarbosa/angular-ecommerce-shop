import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';

import { AppConfigComponent } from './shared/template/config/app.config.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FooterComponent } from './shared/template/footer/footer.component';
import { HeaderComponent } from './shared/template/header/header.component';
import { PrimeNGConfig } from 'primeng/api';
import { Title } from '@angular/platform-browser';
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
  private _primengConfig = inject(PrimeNGConfig);
  private _router = inject(Router);
  private _titleService = inject(Title);

  private _subscription!: Subscription;

  public ngOnInit(): void {
    this.setPageTitles();

    this._primengConfig.ripple = true;

    this._primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    };
  }

  public setPageTitles(): void {
    this._subscription = this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this._router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this._titleService.setTitle(`E-commerce - ${title}`);
        }
      });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
