import { AppConfig } from '../../../../core/interface/app-config';
import { Injectable } from '@angular/core';
import { LayoutState } from '../../../../core/interface/layout';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14,
  };

  public state: LayoutState = {
    overlayMenuActive: false,
    configSidebarVisible: false,
  };

  private configUpdate = new Subject<AppConfig>();
  public readonly configUpdate$ = this.configUpdate.asObservable();

  private overlayOpen = new Subject<any>();
  public readonly overlayOpen$ = this.overlayOpen.asObservable();

  public onMenuToggle(): void {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive;
      if (this.state.overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  public showConfigSidebar(): void {
    this.state.configSidebarVisible = true;
  }

  public isOverlay(): boolean {
    return this.config.menuMode === 'overlay';
  }

  public onConfigUpdate(): void {
    this.configUpdate.next(this.config);
  }
}
