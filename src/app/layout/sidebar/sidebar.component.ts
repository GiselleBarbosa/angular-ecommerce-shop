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
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

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
  private _categoriesService = inject(CategoriesService);

  public sidebarVisible = false;

  public categories!: string[];
  public selectedCategories!: Categories[];

  public ngOnInit(): void {
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
          this.selectedCategories = category;
        })
      )
      .subscribe();
  }
}
