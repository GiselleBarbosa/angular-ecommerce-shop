import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { first, map } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [SidebarModule, ButtonModule, FormsModule, RouterLink, MenuModule],
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
