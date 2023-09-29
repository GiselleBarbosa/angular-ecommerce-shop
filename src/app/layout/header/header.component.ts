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
  templateUrl: './header.component.html',
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
