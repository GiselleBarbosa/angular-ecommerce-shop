import { Component, inject, OnInit } from '@angular/core';
import { first, map } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CategoriesService } from 'src/app/features/products/services/categories/categories.service';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RouterLink } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [
    SidebarModule,
    ButtonModule,
    FormsModule,
    RouterLink,
    MenuModule,
    TranslocoModule,
  ],
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
        label: 'Admininstration',
        icon: 'pi pi-shield',
        routerLink: 'admin',
      },
    ];
  }
}
