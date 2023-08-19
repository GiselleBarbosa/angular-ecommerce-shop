import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription, take } from 'rxjs';
import { ThemeService } from './core/services/theme/theme.service';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  private primengConfig = inject(PrimeNGConfig);
  private themeService = inject(ThemeService);
  private subscription!: Subscription;

  public currentTheme!: string;
  public setButtonTheme!: boolean;

  public ngOnInit(): void {
    this.subscription = this.themeService.theme$.subscribe(theme => {
      document.body.className = theme;
    });

    // ripple - animations primeNg
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }

  public toggleTheme(): void {
    this.themeService.theme$.pipe(take(1)).subscribe(theme => {
      this.currentTheme = theme;

      this.setButtonTheme = theme === 'light' ? true : false;
    });

    this.themeService.toggleTheme();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
