import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Products } from 'src/app/shared/interface/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private url = environment.baseApi;

  public getAllProducts(category: string | null): Observable<Products[]> {
    const apiUrl = category
      ? `${this.url}/products/category/${category}`
      : `${this.url}/products`;

    return this.http.get<any>(apiUrl).pipe(
      map(response => {
        // Add console.log to check response structure
        console.log('API Response:', response);
        return response.products || response;
      })
    );
  }

  public getAllProductsWithFilter(
    category: string,
    multipleCategories: string | null,
    price: number,
    rating: number
  ): Observable<Products[]> {
    let params = new HttpParams();

    if (category) {
      params = params.append('category_id_like', category);
    }

    if (multipleCategories) {
      params = params.append('category_id_like', multipleCategories);
    }

    if (price) {
      params = params.append('unitPrice_lte', price);
    }

    if (rating) {
      params = params.append('rating', rating);
    }

    return this.http.get<any>(`${this.url}/products`, { params }).pipe(
      map(response => {
        return response.products || response;
      })
    );
  }

  public getProductsById(id: string | null): Observable<Products> {
    const url = `${this.url}/products/${id}`;
    return this.http.get<Products>(url);
  }
}
