import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _localStorageService = inject(LocalStorageService);

  private readonly themeKey = 'saved_theme';

  private themeSubject = new BehaviorSubject<string>('light');
  public theme$ = this.themeSubject.asObservable();

  constructor() {
    // const savedTheme = localStorage.getItem(this.themeKey);

    const savedTheme = this._localStorageService.get(this.themeKey);
    if (savedTheme) {
      this.themeSubject.next(savedTheme);
    }
  }

  public toggleTheme(): void {
    const currentTheme = this.themeSubject.getValue();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    this.themeSubject.next(newTheme);
    this._localStorageService.set(this.themeKey, newTheme);
  }
}
