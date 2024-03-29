import { inject, Injectable } from '@angular/core';
import { LayoutService } from './app.layout.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _layoutService = inject(LayoutService);

  public getTheme(): string {
    const savedTheme = localStorage.getItem('ecommerce_saved_theme');

    if (savedTheme) {
      return savedTheme;
    }

    return 'lara-light-indigo';
  }

  public getScheme(): string {
    const savedScheme = localStorage.getItem('ecommerce_saved_scheme');

    if (savedScheme) {
      return savedScheme;
    }

    return 'light';
  }

  public setTheme(theme: string, colorScheme: string): void {
    localStorage.setItem('ecommerce_saved_theme', theme);
    localStorage.setItem('ecommerce_saved_scheme', colorScheme);
  }

  public getFontSize(): number {
    const savedFontSize = localStorage.getItem('ecommerce_saved_font_size');

    if (savedFontSize) {
      return JSON.parse(savedFontSize);
    }

    return 14;
  }

  public setFontSize(size: number): void {
    localStorage.setItem('ecommerce_saved_font_size', JSON.stringify(size));
  }

  public applyScale(scale: number): void {
    document.documentElement.style.fontSize = scale + 'px';
  }

  public changeTheme(theme: string, colorScheme: string): void {
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const newHref = themeLink
      .getAttribute('href')!
      .replace(this._layoutService.config.theme, theme);

    this._layoutService.config.colorScheme;
    this.replaceThemeLink(newHref, () => {
      this._layoutService.config.theme = theme;
      this._layoutService.config.colorScheme = colorScheme;
    });

    this.setTheme(theme, colorScheme);
  }

  public replaceThemeLink(href: string, onComplete: Function): void {
    const id = 'theme-css';
    const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }
}
