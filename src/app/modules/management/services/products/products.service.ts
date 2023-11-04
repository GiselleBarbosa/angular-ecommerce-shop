import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Products } from '../../../../core/interface/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private url = `${environment.baseApi}/products`;

  public getAllProducts(category: string | null): Observable<Products[]> {
    if (category) {
      this.url = `${environment.baseApi}/products/category/${category}`;
    }

    return this.http.get<{ products: Products[] }>(`${this.url}`).pipe(
      map(data => {
        return data.products;
      })
    );
  }

  public getProductsById(id: string | null): Observable<Products> {
    const url = `${this.url}/${id}`;
    return this.http.get<Products>(url);
  }
}
