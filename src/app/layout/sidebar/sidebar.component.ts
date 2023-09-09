import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { first, map } from 'rxjs';
import { Categories } from 'src/app/modules/products/interface/categories';
import { ProductService } from 'src/app/modules/products/services/product.service';

import { CategoriesComponent } from './filter/categories/categories.component';
import { NavigationCategoryComponent } from './navigation-category/navigation-category.component';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';

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
    CategoriesComponent,
    NavigationPanelComponent,
    NavigationCategoryComponent,
    RouterLink,
  ],
})
export class SidebarComponent implements OnInit {
  private _productsService = inject(ProductService);

  public sidebarVisible = true;

  public categories!: string[];
  public selectedCategories!: Categories[];

  public ngOnInit(): void {
    this.getItemCategoriesMenu();
  }

  public sidebarHandler(): void {
    this.sidebarVisible = true;
  }

  public getItemCategoriesMenu(): void {
    this._productsService
      .getAllCategories()
      .pipe(
        first(),
        map(category => {
          this.selectedCategories = category;
        })
      )
      .subscribe();
  }
}
