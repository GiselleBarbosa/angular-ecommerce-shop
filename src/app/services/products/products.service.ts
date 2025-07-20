import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Products } from 'src/app/shared/interface/products';
import { Filters } from 'src/app/shared/interface/filters';

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

  public getAllProductsWithFilter(filters: Filters): Observable<Products[]> {
    let url = 'https://dummyjson.com/products';

    // Se tiver categorias selecionadas
    if (filters.multiplesCategories && filters.multiplesCategories.length > 0) {
      url += `/category/${filters.multiplesCategories[0]}`;
    }

    // Adiciona query params para preço e rating
    let params = new HttpParams();
    if (filters.price > 0) {
      params = params.append('price_lte', filters.price.toString());
    }
    if (filters.rating > 0) {
      params = params.append('rating_gte', filters.rating.toString());
    }

    console.log('Calling API with URL:', url, 'and params:', params.toString());

    return this.http.get<any>(url, { params }).pipe(
      map(response => {
        console.log('API Response:', response);
        return response.products || response;
      })
    );
  }

  public getProductsById(id: string | null): Observable<Products> {
    const url = `${this.url}/products/${id}`;
    return this.http.get<Products>(url);
  }
}
