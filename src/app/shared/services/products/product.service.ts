import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Products } from '../../../modules/products/interface/Products';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
}
