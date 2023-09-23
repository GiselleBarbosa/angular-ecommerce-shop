import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, Subscription } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Products } from '../../../modules/products/interface/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = environment.productsUrl;
  private http = inject(HttpClient);

  private _productsSubscription = new BehaviorSubject<Products[]>([]);
  public products$ = this._productsSubscription.asObservable();

  public getAllProductsFiltered(
    category: string,
    categories: string | null,
    rating: number
  ): Observable<Products[]> {
    let params = new HttpParams();

    if (category) {
      params = params.append('category_like', category);
    }
    if (categories) {
      params = params.append('categories_like', categories);
    }
    if (rating) {
      params = params.append('rating', rating);
    }

    return this.http
      .get<{ products: Products[] }>(`${this.productsUrl}/products`, { params })
      .pipe(
        map(data => {
          return data.products;
        })
      );
  }

  public getAllProductsSubscription(
    category: string,
    categories: string | null,
    rating: number
  ): Subscription {
    return this.getAllProductsFiltered(category, categories, rating).subscribe(response =>
      this._productsSubscription.next(response)
    );
  }
  /*   public getAllProductsByCategory(categoryName: string): Observable<Products[]> {
    return this.http
      .get<{ products: Products[] }>(
        `${this.productsUrl}/products/category/${categoryName}`
      )
      .pipe(
        map(data => {
          return data.products;
        })
      );
  } */
}
