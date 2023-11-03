import { Component, inject, OnInit } from '@angular/core';
import { first, map } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RouterLink } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, FormsModule, RouterLink, MenuModule],

  template: `
    <p-sidebar
      [(visible)]="sidebarVisible"
      position="right"
      styleClass="min-w-min w-20rem">
      <h4 class="cursor-pointer mb-3 font-semibold text-primary" routerLink="products">
        Angular E-commerce
      </h4>

      <h6>Panel</h6>
      <p-menu [model]="navigationMenuItems" styleClass="w-15rem"></p-menu>

      <div class="mt-4">
        <h6>Categories</h6>

        <p-menu [model]="categories" styleClass="w-15rem"></p-menu>
      </div>
    </p-sidebar>

    <p-button (click)="sidebarHandler()" icon="pi pi-align-justify" />
  `,
})
export class SidebarComponent implements OnInit {
  private _categoriesService = inject(CategoriesService);

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
          alert('pending implementation');
        },
      },
    ];
  }
}
