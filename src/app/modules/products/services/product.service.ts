import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Categories } from '../interface/categories';
import { Product } from '../interface/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = environment.productsUrl;

  private http = inject(HttpClient);

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/products`);
  }

  public getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.productsUrl}/categories`);
  }
}
