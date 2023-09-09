import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { first, map } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-navigation-category',
  templateUrl: './navigation-category.component.html',
  styleUrls: ['./navigation-category.component.scss'],
  standalone: true,
  imports: [FormsModule, MenuModule],
})
export class NavigationCategoryComponent implements OnInit {
  private _categoriesService = inject(CategoriesService);

  public categories!: MenuItem[] | any;
  public selectedCategories!: MenuItem[];

  public ngOnInit(): void {
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
}
