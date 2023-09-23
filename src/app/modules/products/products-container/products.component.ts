import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { first, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [
    DataViewModule,
    RatingModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    RouterLink,
  ],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _productsService = inject(ProductsService);
  private _route = inject(ActivatedRoute);
  private _subscription!: Subscription;

  public products!: any[];

  public sortOptions!: SelectItem[];
  public sortOrder!: number;
  public sortField!: string;

  public ngOnInit(): void {
    this.getAllProducts();
    this.getSortProductsValues();
  }

  public getAllProducts(): void {
    this._subscription = this._route.paramMap.subscribe((params: ParamMap) => {
      const categoryByRoute = params.get('categoryName');

      this._productsService
        .getAllProducts(categoryByRoute)
        .pipe(first())
        .subscribe(data => {
          this.products = data;
          console.log(data);
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
    this._subscription.unsubscribe();
  }
}
