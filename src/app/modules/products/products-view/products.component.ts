import { Component, inject, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { first } from 'rxjs';
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
export class ProductsComponent implements OnInit {
  private _productService = inject(ProductService);

  public product: Product[] = [];

  public sortOptions!: SelectItem[];
  public sortOrder!: number;
  public sortField!: string;

  public ngOnInit(): void {
    this._productService
      .getAllProducts()
      .pipe(first())
      .subscribe(data => {
        this.product = data;

        this.sortOptions = [
          { label: 'Price High', value: '!price' },
          { label: 'Price Low', value: 'price' },
        ];
      });
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
}
