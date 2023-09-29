import { Component, inject } from '@angular/core';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CardModule } from 'primeng/card';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CardModule,
    AsyncPipe,
    TableModule,
    CurrencyPipe,
    TagModule,
    ButtonModule,
    NgIf,
    NgFor,
  ],
  template: `
    <div class="mb-3">
      <h1>Shopping cart</h1>
    </div>

    <p-card>
      <ng-container *ngIf="cart$ | async as products">
        <p-table [value]="products" [tableStyle]="{ 'min-width': '60rem' }">
          <ng-template pTemplate="caption">
            <div class="flex align-items-center justify-content-between">
              <h2>These are the products added to your cart</h2>
            </div>
          </ng-template>
          <ng-template pTemplate="header" *ngIf="cart$ | async as products">
            <tr>
              <th>Product name</th>
              <th>Image</th>
              <th>Unit price</th>
              <th>Subtotal</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-product>
            <tr>
              <td>{{ product.title }}</td>
              <td>
                <img
                  [src]="product.images[0]"
                  [alt]="product.title"
                  width="100"
                  class="shadow-4" />
              </td>
              <td>{{ product.price | currency : 'USD' }}</td>
              <td>{{ product.category }}</td>

              <td class="flex gap-3">
                <p-button styleClass="p-button-sm" icon="pi pi-minus" />
                <p-button
                  class="p-button-sm"
                  styleClass="p-button-sm"
                  icon="pi pi-plus" />
                <p-button
                  class="p-button-sm"
                  styleClass="p-button-sm p-button-danger"
                  icon="pi pi-trash" />
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="summary">
            <div class="flex align-items-center justify-content-between">
              In total there are {{ products ? products.length : 0 }} products.
            </div>
          </ng-template>
        </p-table>
      </ng-container>
    </p-card>
  `,
})
export class CartComponent {
  private _cartService = inject(CartService);

  public cart$ = this._cartService.cartObservable$;
}
