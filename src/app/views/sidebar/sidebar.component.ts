import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { SliderModule } from 'primeng/slider';
import { first, map } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FiltersService } from 'src/app/services/filter/filters.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Categories } from 'src/app/shared/interface/categories';

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
  private _filtersService = inject(FiltersService);
  private _router = inject(Router);
  private _productsService = inject(ProductsService);

  public sidebarVisible = false;
  public navigationMenuItems!: MenuItem[];
  public categories: MenuItem[] = [];
  public selectedCategories!: MenuItem[];
  public filterCategories: Categories[] = [];

  public selectedRating = 0;
  public minPrice = 0;
  public maxPrice = 100;
  public selectedMultiplesCategories: string[] = [];

  public showAllCategories = false;

  public ngOnInit(): void {
    this.getItemsForThePanelNavigationMenu();
    this.getAllCategoriesList();
    this.getItemCategoriesMenu();

    this._productsService
      .getAllProducts(null)
      .pipe(first())
      .subscribe(products => {
        this.maxPrice = Math.max(...products.map(p => p.price));
      });

    this.selectedRating = this._filtersService.rating;
    this.maxPrice = this._filtersService.price;
    this.selectedMultiplesCategories = [...this._filtersService.multiplesCategories];
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
              command: (): void => {
                this._filtersService.updateFilters({
                  category: category.name,
                  multiplesCategories: [category.name],
                });
                this._filtersService.getRequests();
                this._router.navigate(['/products']);
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

  public getSelectedCategories(): void {
    console.log('Categorias selecionadas:', this.selectedMultiplesCategories);
    if (this.selectedMultiplesCategories && this.selectedMultiplesCategories.length > 0) {
      this._filtersService.updateFilters({
        multiplesCategories: this.selectedMultiplesCategories,
      });
    }
  }

  public getSelectedPrice(): void {
    console.log('Preço selecionado:', this.minPrice, this.maxPrice);
    this._filtersService.updateFilters({ price: this.maxPrice });
  }

  public getSelectedRating(): void {
    console.log('Rating selecionado:', this.selectedRating);
    this._filtersService.updateFilters({ rating: this.selectedRating });
  }

  public getAllCategoriesList(): void {
    this._categoriesService
      .getAllCategories()
      .pipe(first())
      .subscribe(categories => {
        this.filterCategories = categories;
      });
  }

  public applyFilters(): void {
    const filters = {
      price: this.maxPrice,
      rating: this.selectedRating,
      multiplesCategories: this.selectedMultiplesCategories,
    };
    console.log('Aplicando filtros:', filters);

    this._filtersService.updateFilters(filters);
    this._filtersService.getRequests();
    this._router.navigate(['/']);

    this.sidebarVisible = false;
  }

  public toggleShowAllCategories(): void {
    this.showAllCategories = !this.showAllCategories;
  }
}
