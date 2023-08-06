import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from './core/services/theme/theme.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(private themeService: ThemeService, private primengConfig: PrimeNGConfig) {}

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

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
