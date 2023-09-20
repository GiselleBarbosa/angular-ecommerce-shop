import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { first } from 'rxjs';
import { Categories } from 'src/app/modules/products/interface/categories';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    FormsModule,
    MultiSelectModule,
    DropdownModule,
    NgFor,
    RouterLink,
    MenuModule,
    CheckboxModule,
  ],
})
export class SidebarComponent implements OnInit {
  private _categoriesService = inject(CategoriesService);

  public sidebarVisible = true;

  public navigationMenuItems!: MenuItem[];

  public categories!: Categories[];

  public selectedCategories!: Categories[];

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
      .pipe(first())
      .subscribe(category => {
        console.log(category);
        this.categories = category;
      });
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

  public handlerSelectedCategories(): void {
    return console.log(this.selectedCategories);
  }
}
