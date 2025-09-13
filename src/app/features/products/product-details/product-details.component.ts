import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { first, Subscription } from 'rxjs';

import { ButtonModule } from 'primeng/button';

import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';

import { TranslocoModule } from '@ngneat/transloco';
import { RatingModule } from 'primeng/rating';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Cart } from 'src/app/shared/interface/cart';
import { Products } from 'src/app/shared/interface/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    RatingModule,
    FormsModule,
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
