import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  public isLightTheme = true;

  public onThemeSwitchChange(): void {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute('data-theme', this.isLightTheme ? 'light' : 'dark');
  }
}
