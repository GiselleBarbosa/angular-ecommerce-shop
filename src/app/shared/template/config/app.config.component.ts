import { Component, inject, Input, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ConfigService } from './services/config.service';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LayoutService } from 'src/app/shared/template/config/services/app.layout.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-config',
  templateUrl: './app.config.component.html',
  standalone: true,
  imports: [
    FormsModule,
    SidebarModule,
    RadioButtonModule,
    ButtonModule,
    InputSwitchModule,
    NgIf,
    NgFor,
    NgClass,
  ],
})
export class AppConfigComponent implements OnInit {
  private _configService = inject(ConfigService);
  private _layoutService = inject(LayoutService);

  @Input() public minimal = false;

  public scales: number[] = [14, 15, 16, 17, 18];

  public ngOnInit(): void {
    const savedRipple = localStorage.getItem('saved_ripple');
    const savedFontSize = this._configService.getFontSize();

    if (savedFontSize) {
      this.scale = savedFontSize;
    }

    if (savedRipple) {
      this.ripple = JSON.parse(savedRipple);
    }
  }

  get visible(): boolean {
    return this._layoutService.state.configSidebarVisible;
  }

  set visible(_val: boolean) {
    this._layoutService.state.configSidebarVisible = _val;
  }

  get scale(): number {
    return this._layoutService.config.scale;
  }

  set scale(_val: number) {
    this._layoutService.config.scale = _val;
    this._configService.setFontSize(_val);
  }

  get menuMode(): string {
    return this._layoutService.config.menuMode;
  }

  set menuMode(_val: string) {
    this._layoutService.config.menuMode = _val;
  }

  get inputStyle(): string {
    return this._layoutService.config.inputStyle;
  }

  set inputStyle(_val: string) {
    this._layoutService.config.inputStyle = _val;
  }

  get ripple(): boolean {
    return this._layoutService.config.ripple;
  }

  set ripple(_val: boolean) {
    this._layoutService.config.ripple = _val;
    localStorage.setItem('saved_ripple', JSON.stringify(_val));
  }

  public onConfigButtonClick(): void {
    this._layoutService.showConfigSidebar();
  }

  public changeTheme(theme: string, colorScheme: string): void {
    this._configService.changeTheme(theme, colorScheme);
  }

  public decrementScale(): void {
    this.scale--;
    this.applyScale();
  }

  public incrementScale(): void {
    this.scale++;
    this.applyScale();
  }

  public applyScale(): void {
    this._configService.applyScale(this.scale);
  }
}
