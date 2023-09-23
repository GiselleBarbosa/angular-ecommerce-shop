import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { first } from 'rxjs';
import { Categories } from 'src/app/modules/products/interface/categories';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { RatingModule } from 'primeng/rating';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';
import { FiltersService } from 'src/app/shared/services/filters/filters.service';

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
    RatingModule,
  ],
})
export class SidebarComponent implements OnInit {
  private _categoriesService = inject(CategoriesService);
  private _filtersService = inject(FiltersService);
  private _router = inject(Router);

  public sidebarVisible = true;

  public navigationMenuItems!: MenuItem[];
  public categories!: Categories[];

  public selectedCategories = this._filtersService.categories;
  public selectedRating = this._filtersService.rating;

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

  public getSelectedCategories(): void {
    console.log(this._filtersService.categories);
    this._filtersService.categories = this.selectedCategories;
  }

  public getSelectedRating(): void {
    this._filtersService.rating = this.selectedRating;
  }

  public requestFilters(): void {
    this._router.navigate(['/']);
    this._filtersService.getRequests();
  }
}
