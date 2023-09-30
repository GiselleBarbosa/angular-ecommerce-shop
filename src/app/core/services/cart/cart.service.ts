import { inject, Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Cart } from '../../interface/cart';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: Cart[] = [];

  private _localStorageService = inject(LocalStorageService);

  private _cartObservable = new BehaviorSubject<Cart[]>(this.cart);
  public readonly cartObservable$ = this._cartObservable.asObservable();

  private _totalPriceCartObservable = new BehaviorSubject(0);
  public readonly totalPrice$ = this._totalPriceCartObservable.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('SAVED_CART');

    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this._cartObservable.next(this.cart);
    }
  }

  public addProductsToCart(cartItem: Cart): void {
    const index = this.cart.find(product => product.id === cartItem.id);

    if (!index) {
      this.cart.push(cartItem);
      this.updateCart();

      console.log(this.cart + ' ADD');
    } else {
      const index = this.cart.findIndex(product => product.id === cartItem.id);
      this.cart[index].units++;
      this.updateCart();
    }

    localStorage.setItem('SAVED_CART', JSON.stringify(this.cart));
    this._cartObservable.next(this.cart);
  }

  public calculateTotalPrice(): void {
    const totalPrice = this.cart.reduce(
      (total, item) => total + item.price * item.units,
      0
    );

    this._totalPriceCartObservable.next(totalPrice);
  }

  public removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    this._localStorageService.set('SAVED_CART', this.cart);

    this.updateCart();
  }

  private updateCart(): void {
    this._cartObservable.next(this.cart);
  }
}
