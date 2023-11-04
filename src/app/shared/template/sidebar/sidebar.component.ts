import { Component, inject, OnInit } from '@angular/core';
import { first, map } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CategoriesService } from 'src/app/modules/management/services/categories/categories.service';
import { ChangeLanguageService } from '../services/change-language.service';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RouterLink } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    FormsModule,
    RouterLink,
    MenuModule,
    TranslocoModule,
  ],

  template: `
    <ng-container *transloco="let transloco">
      <p-sidebar
        [(visible)]="sidebarVisible"
        position="right"
        styleClass="min-w-min w-20rem ">
        <div class="flex align-items-center gap-2">
          <i
            style="font-size: 1.5rem; color: var(--primary-color)"
            class="icon pi pi-shopping-bag cursor-pointer"
            routerLink="cart"></i>
          <h4 class="cursor-pointerfont-semibold text-primary" routerLink="products">
            Angular e-commerce
          </h4>
        </div>

        <h6>{{ transloco('sidebar.setting') }}</h6>
        <p-menu [model]="navigationMenuItems" styleClass="w-15rem"></p-menu>

        <div class="mt-4">
          <h6>{{ transloco('sidebar.categories') }}</h6>
          <p-menu [model]="categories" styleClass="w-15rem"></p-menu>
        </div>
      </p-sidebar>

      <p-button (click)="sidebarHandler()" icon="pi pi-align-justify" />
    </ng-container>
  `,
})
export class SidebarComponent implements OnInit {
  private _categoriesService = inject(CategoriesService);
  private _changeLanguageService = inject(ChangeLanguageService);

  public sidebarVisible = false;

  public navigationMenuItems!: MenuItem[];

  public categories!: MenuItem[] | any;
  public selectedCategories!: MenuItem[];

  public ngOnInit(): void {
    this.getItemsForThePanelNavigationMenu();

    this.getItemCategoriesMenu();
  }

  public sidebarHandler(): void {
    this.sidebarVisible = true;
  }

  public getItemCategoriesMenu(): void {
    this._categoriesService
      .getAllCategories()
      .pipe(
        first(),
        map(category => {
          this.categories = category.map(category => {
            return {
              label: category,
              routerLink: `products/category/${category}`,
            };
          });
        })
      )
      .subscribe();
  }

  public getItemsForThePanelNavigationMenu(): void {
    this.navigationMenuItems = [
      {
        label: 'Cart',
        icon: 'pi pi-shopping-cart',
        routerLink: '/cart',
      },

      {
        label: 'Login',
        icon: 'pi pi-user',
        routerLink: 'auth/login',
      },

      {
        label: 'Translate',
        icon: 'pi pi-language',
        command: (): void => {
          this._changeLanguageService.changeLanguage();
        },
      },
    ];
  }
}
