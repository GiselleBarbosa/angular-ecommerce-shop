import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { MessageService, SelectItem } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { Cart } from 'src/app/core/interface/cart';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';

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
    ToastModule,
    CurrencyPipe,
  ],
  providers: [MessageService],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _cartService = inject(CartService);
  private _productsService = inject(ProductsService);
  private _messageService = inject(MessageService);
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

  public addProductOnCart(product: Cart): void {
    const selectedProducts: Cart = {
      id: product.id,
      title: product.title,
      category: product.category,
      price: product.price,
      images: product.images,
      brand: product.brand,
      units: (product.units = 1),
    };
    this._cartService.addProductsToCart(selectedProducts);
    this.showToast();
    this._cartService.getTotalUnits();
  }

  public showToast(): void {
    this._messageService.add({
      severity: 'success',
      summary: 'Added product',
      detail: 'Sent to cart',
      life: 500,
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
