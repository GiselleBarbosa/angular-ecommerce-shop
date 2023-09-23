import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { first, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { Products } from '../../interface/Products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    NgFor,
    NgIf,
    CurrencyPipe,
  ],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private _productsService = inject(ProductsService);

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

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
