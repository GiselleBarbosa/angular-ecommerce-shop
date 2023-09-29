import { BehaviorSubject } from 'rxjs';
import { Cart } from '../../interface/cart';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: Cart[] = [];

  private _cartObservable = new BehaviorSubject<Cart[]>(this.cart);
  public readonly cartObservable$ = this._cartObservable.asObservable();

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

      console.log(this.cart + ' ADD');
    } else {
      const index = this.cart.findIndex(product => product.id === cartItem.id);
      this.cart[index].units++;
    }

    localStorage.setItem('SAVED_CART', JSON.stringify(this.cart));
    this._cartObservable.next(this.cart);
  }
}
