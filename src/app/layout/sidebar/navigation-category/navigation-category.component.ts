import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { first, map } from 'rxjs';
import { ProductService } from 'src/app/modules/products/services/product.service';

@Component({
  selector: 'app-navigation-category',
  templateUrl: './navigation-category.component.html',
  styleUrls: ['./navigation-category.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf, MenuModule],
})
export class NavigationCategoryComponent implements OnInit {
  private _productsService = inject(ProductService);

  public categories!: MenuItem[] | any;
  public selectedCategories!: MenuItem[];

  public ngOnInit(): void {
    this._productsService
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
