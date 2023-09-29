import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
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
})
export class CartComponent {
  private _cartService = inject(CartService);

  public cart$ = this._cartService.cartObservable$;

  public totalOrder = 100;
}
