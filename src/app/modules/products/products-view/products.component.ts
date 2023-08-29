import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DataViewComponent } from 'src/app/shared/components/data-view/data-view.component';

import { Product } from '../interface/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [DataViewComponent],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _productService = inject(ProductService);
  private _route = inject(ActivatedRoute);

  private subscription!: Subscription;
  private categoryId!: string | null;
  public product: Product[] = [];

  public sortOptions!: SelectItem[];
  public sortOrder!: number;
  public sortField!: string;

  public ngOnInit(): void {
    this.getSortProductsValues();
    this.getProductsByRouteParams();
  }

  public getAllProducts(): void {
    this._productService
      .getAllProductsByCategory(this.categoryId)

      .subscribe(data => {
        this.product = data;
      });
  }

  public getProductsByRouteParams(): void {
    this.subscription = this._route.paramMap.subscribe((params: ParamMap) => {
      this.categoryId = params.get('id');

      this.getAllProducts();
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
