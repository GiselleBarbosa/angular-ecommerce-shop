import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'saved_theme';

  private themeSubject = new BehaviorSubject<string>('light');
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme) {
      this.themeSubject.next(savedTheme);
    }
  }

  public toggleTheme(): void {
    const currentTheme = this.themeSubject.getValue();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    this.themeSubject.next(newTheme);
    localStorage.setItem(this.themeKey, newTheme);
  }
}
