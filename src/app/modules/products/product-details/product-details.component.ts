import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { first, Subscription } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { Cart } from 'src/app/core/interface/cart';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Products } from '../../../core/interface/products';
import { ProductsService } from 'src/app/modules/management/services/products/products.service';
import { RatingModule } from 'primeng/rating';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    NgFor,
    NgIf,
    CurrencyPipe,
    TranslocoModule,
  ],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private _productsService = inject(ProductsService);
  private _cartService = inject(CartService);
  private _messageService = inject(MessageService);

  private _route = inject(ActivatedRoute);

  private _subscription!: Subscription;

  public product!: Products;

  public ngOnInit(): void {
    this._subscription = this._route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      this._productsService
        .getProductsById(id)
        .pipe(first())
        .subscribe(products => {
          console.log(products);
          this.product = products;
        });
    });
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
