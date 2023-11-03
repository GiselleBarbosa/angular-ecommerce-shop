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

  private _totalUnitsObservable = new BehaviorSubject(0);
  public readonly totalUnits$ = this._totalUnitsObservable.asObservable();

  constructor() {
    this.getProductsFromLocalStorage();
  }

  public getProductsFromLocalStorage(): void {
    const savedCart = localStorage.getItem('SAVED_CART');

    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this._cartObservable.next(this.cart);
      this.updateCart();
    }
  }

  public addProductsToCart(cartItem: Cart): void {
    const index = this.cart.find(product => product.id === cartItem.id);

    if (!index) {
      this.cart.push(cartItem);
    } else {
      const index = this.cart.findIndex(product => product.id === cartItem.id);
      this.cart[index].units++;
    }

    localStorage.setItem('SAVED_CART', JSON.stringify(this.cart));
    this.updateCart();
  }

  public increaseUnits(unitProducts: Cart): void {
    const index = this.cart.find(item => item.id === unitProducts.id);

    if (index) {
      unitProducts.units++;
      localStorage.setItem('SAVED_CART', JSON.stringify(this.cart));
      this.calculateTotalPrice();
      this.getTotalUnits();
      this.updateCart();
    }
  }

  public decreaseUnits(unitProducts: Cart): void {
    const index = this.cart.find(item => item.id === unitProducts.id);

    if (index && unitProducts.units > 1) {
      unitProducts.units--;
      localStorage.setItem('SAVED_CART', JSON.stringify(this.cart));
      this.calculateTotalPrice();
      this.getTotalUnits();
      this.updateCart();
    }
  }

  public removeAllUnits(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    this._localStorageService.set('SAVED_CART', this.cart);
    this.calculateTotalPrice();
    this.getTotalUnits();
    this.updateCart();
  }

  public removeAllProducts(): void {
    this.cart = [];
    this._localStorageService.set('SAVED_CART', this.cart);
    this.calculateTotalPrice();
    this.getTotalUnits();
    this.updateCart();
  }

  public getTotalUnits(): void {
    const totalUnits = this.cart.reduce((total, item) => total + item.units, 0);
    this.updateCart();

    return this._totalUnitsObservable.next(totalUnits);
  }

  public calculateTotalPrice(): void {
    const totalPrice = this.cart.reduce(
      (total, item) => total + item.price * item.units,
      0
    );

    this._totalPriceCartObservable.next(totalPrice);
    this.updateCart();
  }

  private updateCart(): void {
    this._cartObservable.next(this.cart);
  }
}