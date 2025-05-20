import { Component, inject, OnInit } from '@angular/core';
import { first, map } from 'rxjs';

import { ButtonModule } from 'primeng/button';

import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FiltersService } from 'src/app/services/filter/filters.service';
import { Categories } from 'src/app/shared/interface/categories';
import { RatingModule } from 'primeng/rating';
import { CheckboxModule } from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { CardModule } from 'primeng/card';
import { NgFor, NgIf } from '@angular/common';

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
    SliderModule,
    RatingModule,
    CheckboxModule,
    CardModule,
    NgIf,
    NgFor,
  ],
  standalone: true,
})
export class SidebarComponent implements OnInit {
  private _categoriesService = inject(CategoriesService);

  public sidebarVisible = false;
  public navigationMenuItems!: MenuItem[];
  public categories!: MenuItem[] | any;
  public selectedCategories!: MenuItem[];
  private _filtersService = inject(FiltersService);

  public filterCategories: Categories[] = [];
  private _router = inject(Router);

  public selectedRating = this._filtersService.rating;
  public selectedPrice = this._filtersService.price;
  public selectedMultiplesCategories = this._filtersService.multiplesCategories;

  public ngOnInit(): void {
    this.getItemsForThePanelNavigationMenu();

    this.getItemCategoriesMenu();

    this.getAllCategoriesList();
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

  public getAllCategoriesList(): void {
    this._categoriesService
      .getAllCategories()
      .pipe(first())
      .subscribe(category => {
        this.filterCategories = category;
      });
  }

  public getSelectedCategories(): void {
    this._filtersService.multiplesCategories = this.selectedMultiplesCategories;
  }

  public getSelectedPrice(): void {
    this._filtersService.price = this.selectedPrice;
  }

  public getSelectedRating(): void {
    this._filtersService.rating = this.selectedRating;
  }

  public applyFilters(): void {
    this._router.navigate(['/']);
    this._filtersService.getRequests();
  }
}
