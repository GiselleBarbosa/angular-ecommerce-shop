import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Categories } from '../interface/categories';
import { Products } from '../interface/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = environment.productsUrl;

  private http = inject(HttpClient);

  public getAllProducts(): Observable<Products[]> {
    return this.http.get<{ products: Products[] }>(`${this.productsUrl}/products`).pipe(
      map(data => {
        return data.products;
      })
    );
  }

  public getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.productsUrl}/products/categories`);
  }

  public getAllProductsByCategory(categoryName: string): Observable<Products[]> {
    return this.http
      .get<{ products: Products[] }>(
        `${this.productsUrl}/products/category/${categoryName}`
      )
      .pipe(
        map(data => {
          return data.products;
        })
      );
  }
}
