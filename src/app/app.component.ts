import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(private themeService: ThemeService) {}

  public ngOnInit(): void {
    this.subscription = this.themeService.theme$.subscribe(theme => {
      document.body.className = theme;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
