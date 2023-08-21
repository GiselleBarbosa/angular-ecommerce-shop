import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/Product';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = environment.productsUrl;

  private http = inject(HttpClient);

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/products`);
  }
}
