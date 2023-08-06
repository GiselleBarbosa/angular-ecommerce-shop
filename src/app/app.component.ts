import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgClass],
})
export class AppComponent implements OnInit {
  private _themeService = inject(ThemeService);

  public theme$ = this._themeService.theme$;

  public ngOnInit(): void {
    this._themeService.theme$.subscribe(theme => {
      document.body.className = theme;
    });
  }

  public toggleTheme(): void {
    this._themeService.toggleTheme();
  }
}
