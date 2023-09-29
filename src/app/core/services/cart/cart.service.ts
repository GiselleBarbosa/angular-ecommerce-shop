import { Injectable } from '@angular/core';
import { Cart } from '../../interface/cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: Cart[] = [];

  private _cartObservable = new BehaviorSubject<Cart[]>(this.cart);
  public readonly cartObservable$ = this._cartObservable.asObservable();

  public addProductsToCart(product: Cart): void {
    this.cart.push(product);
    this._cartObservable.next(this.cart);
  }
}
