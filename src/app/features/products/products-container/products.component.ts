import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription, catchError, delay, of, tap, throwError } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { FiltersService } from 'src/app/services/filter/filters.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { ItemsPerPageService } from 'src/app/services/sort-items-per-page/items-per-page.service';
import { PriceOrderService } from 'src/app/services/sort-price-order/price-order.service';
import { Cart } from 'src/app/shared/interface/cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [
    DataViewModule,
    RatingModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    RouterLink,
    CurrencyPipe,
    TranslocoModule,
    TooltipModule,
    NgIf,
    AsyncPipe,
    ProgressSpinnerModule,
  ],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _cartService = inject(CartService);
  private _productsService = inject(ProductsService);
  private _messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);
  private _subscription!: Subscription;
  private _filtersService = inject(FiltersService);
  private _confirmationService = inject(ConfirmationService);
  private _itemsPerPageService = inject(ItemsPerPageService);
  private _priceOrderService = inject(PriceOrderService);
  private _route = inject(ActivatedRoute);

  public products!: any[];
  public sortOptions!: SelectItem[];
  public sortOrder!: number;
  public sortField!: string;
  public isLoading = true;

  public rows = 12;
  public quantityOptions!: SelectItem[];
  public quantitySelected!: number;

  public getAllProductsWithFilter$ = this._filtersService.getAllProductsWithFilter$.pipe(
    tap(() => this.getAllProductsWithFilter())
  );

  public ngOnInit(): void {
    this.getAllProductsWithFilter();

    this.sortOptions = this._priceOrderService.orderPriceOptions();
    this.quantityOptions = this._itemsPerPageService.quantityItemsOptions();
  }

  public getAllProductsWithFilter(): void {
    const multipleCategories = this._filtersService.multiplesCategories.join('|');

    const { price, rating, category } = this._filtersService;

    this._productsService
      .getAllProductsWithFilter(category, multipleCategories, price, rating)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(err => {
          of([]);
          this.onConfirm();
          return throwError(() => {
            throwError(err);
          });
        })
      )
      .subscribe(products => {
        this.isLoading = false;

        this.products = products;
        console.warn('products', JSON.stringify(products));
      });
  }

  public onChangeQuantityItemPage(): void {
    this.rows = this.quantitySelected;
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

  public onConfirm(): void {
    this._confirmationService.confirm({
      message: 'Falha ao exibir os produtos. Deseja atualizar a página?',
      icon: 'pi pi-exclamation-circle',
      accept: () => {
        location.reload();
      },
      reject: () => {
        this._messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Não foram feitas alterações.',
          life: 2000,
        });
      },
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

  /* private showErrorToast(): void {
    this._messageService.add({
      severity: 'error',
      summary: 'Unexpected error',
      detail: 'Unable to load products',
      life: 3000,
    });
  } */

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
