import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Cart } from 'src/app/core/interface/cart';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { RouterLink } from '@angular/router';
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
    RouterLink,
  ],
})
export class CartComponent implements OnInit {
  private _cartService = inject(CartService);
  private _confirmationService = inject(ConfirmationService);
  private _messageService = inject(MessageService);

  public cart$ = this._cartService.cartObservable$;

  public totalPrice$ = this._cartService.totalPrice$;

  public ngOnInit(): void {
    this._cartService.calculateTotalPrice();
  }

  public onConfirm(event: Event): void {
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to remove all products?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._cartService.removeAllProducts();
        this._messageService.add({
          severity: 'success',
          summary: 'Confirm',
          detail: 'Your cart has been cleaned',
        });
      },
      reject: () => {
        this._messageService.add({
          severity: 'info',
          summary: 'Cancel',
          detail: 'Operation was canceled',
        });
      },
    });
  }

  public increaseUnits(unitProducts: Cart): void {
    this._cartService.increaseUnits(unitProducts);
  }

  public decreaseUnits(unitProducts: Cart): void {
    this._cartService.decreaseUnits(unitProducts);
  }

  public removeAllUnits(productId: number): void {
    this._cartService.removeAllUnits(productId);
    this._cartService.getTotalUnits();
  }

  public removeAllProducts(): void {
    this._cartService.removeAllProducts();
  }
}
