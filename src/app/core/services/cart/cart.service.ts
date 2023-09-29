import { Injectable } from '@angular/core';
import { Cart } from '../../interface/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cart: Cart[] = [];

  public addProductsToCart(product: Cart): void {
    this.cart.push(product);
    console.log(this.cart);
  }
}
