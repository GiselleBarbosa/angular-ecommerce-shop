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
  styleUrls: ['./sidebar.component.scss'],
  templateUrl: './sidebar.component.html',
  imports: [
    SidebarModule,
    ButtonModule,
    FormsModule,
    RouterLink,
    MenuModule,
    TranslocoModule,
  ],
  standalone: true,
})
export class SidebarComponent implements OnInit {
  private _categoriesService = inject(CategoriesService);

  public sidebarVisible = true;
  public navigationMenuItems!: MenuItem[];
  public categories!: MenuItem[] | any;
  public selectedCategories!: MenuItem[];

  public ngOnInit(): void {
    this.getItemsForThePanelNavigationMenu();

    this.getItemCategoriesMenu();
  }

  public toogleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  public getItemCategoriesMenu(): void {
    this._categoriesService
      .getAllCategories()
      .pipe(
        first(),
        map(category => {
          this.categories = category.map(category => {
            return {
              label: category.name,
              routerLink: `products/category/${category.name}`,
              command: (): void => {
                this.toogleSidebar();
              },
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
        command: (): void => {
          this.toogleSidebar();
        },
      },

      {
        label: 'Login',
        icon: 'pi pi-user',
        routerLink: 'auth/login',
        command: (): void => {
          this.toogleSidebar();
        },
      },

      {
        label: 'Admininstration',
        icon: 'pi pi-shield',
        routerLink: 'admin',
      },
    ];
  }
}
