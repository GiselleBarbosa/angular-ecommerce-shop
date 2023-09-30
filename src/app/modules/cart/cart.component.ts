import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Cart } from 'src/app/core/interface/cart';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Products } from 'src/app/core/interface/products';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

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
    ToastModule,
  ],
})
export class CartComponent implements OnInit {
  private _cartService = inject(CartService);

  public cart$ = this._cartService.cartObservable$;

  public totalPrice$ = this._cartService.totalPrice$;

  public ngOnInit(): void {
    this._cartService.calculateTotalPrice();
  }

  public removeFromCart(productId: number): void {
    this._cartService.removeFromCart(productId);
  }
}
