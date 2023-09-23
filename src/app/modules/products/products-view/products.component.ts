import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { first, Subscription } from 'rxjs';
import { DataViewComponent } from 'src/app/shared/components/data-view/data-view.component';
import { FiltersService } from 'src/app/shared/services/filters/filters.service';
import { ProductService } from 'src/app/shared/services/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [DataViewComponent],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _productsService = inject(ProductService);
  private _filtersService = inject(FiltersService);
  private _route = inject(ActivatedRoute);

  private subscription!: Subscription;

  public products!: any[];

  public sortOptions!: SelectItem[];
  public sortOrder!: number;
  public sortField!: string;

  public ngOnInit(): void {
    this.getSortProductsValues();
    this.getAllProducts();
  }

  public getAllProducts(): void {
    let categoryByRoute!: string | null;

    this.subscription = this._route.paramMap.subscribe((params: ParamMap) => {
      const categoryByRoute = params.get('categoryName');

      const categories = this._filtersService.categories.join('|');

      this._productsService
        .getAllProductsFiltered(categories, categoryByRoute, this._filtersService.rating)
        .pipe(first())
        .subscribe(data => {
          this.products = data;
        });
    });
  }

  public getSortProductsValues(): void {
    this.sortOptions = [
      { label: 'Price High', value: '!price' },
      { label: 'Price Low', value: 'price' },
    ];
  }

  public onSortChange(event: any): void {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
