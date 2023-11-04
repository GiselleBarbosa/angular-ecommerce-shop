import { inject, Injectable } from '@angular/core';

import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class ChangeLanguageService {
  private _translocoService = inject(TranslocoService);

  public getActiveLang(): string {
    const currentLang = this._translocoService.getActiveLang();
    return currentLang;
  }

  public changeLanguage(): void {
    const portuguese = 'pt';
    const english = 'en';

    const checkCurrentLang = this.getActiveLang();
    if (checkCurrentLang === english) {
      this._translocoService.setActiveLang(portuguese);
    } else if (checkCurrentLang === portuguese) {
      this._translocoService.setActiveLang(english);
    }

    localStorage.setItem('saved_language', this.getActiveLang());
  }
}
