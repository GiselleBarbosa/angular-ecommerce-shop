import { NgIf } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MegaMenuModule } from 'primeng/megamenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { Subscription, take } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme/theme.service';

import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    ToolbarModule,
    NgIf,
    RouterLink,
    SplitButtonModule,
    MegaMenuModule,
    SidebarComponent,
  ],
  template: `<p-toolbar styleClass="align-items-center pt-0 pb-0">
    <div class="p-toolbar-group-start">
      <h1 class="cursor-pointer" routerLink="/products">Angular Shopping</h1>
      <app-sidebar class="ml-5" />
    </div>

    <div class="p-toolbar-group-end mb-4 gap-5 md: mt-4 flex-wrap">
      <i class="icon pi pi-shopping-cart mr-2 cursor-pointer" routerLink="cart"></i>
      <div (click)="toggleTheme()" class="flex cursor-pointer">
        <i class="icon pi pi-sun mr-2" *ngIf="setButtonTheme"></i>
        <i class="icon pi pi-moon mr-2" *ngIf="!setButtonTheme"></i>
      </div>
    </div>
  </p-toolbar> `,
})
export class HeaderComponent implements OnDestroy {
  private themeService = inject(ThemeService);

  private subscription!: Subscription;

  public setButtonTheme!: boolean;
  public currentTheme!: string;

  public toggleTheme(): void {
    this.themeService.theme$.pipe(take(1)).subscribe(theme => {
      this.currentTheme = theme;

      this.setButtonTheme = theme === 'light' ? true : false;
    });

    this.themeService.toggleTheme();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
