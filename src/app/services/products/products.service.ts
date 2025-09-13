import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Filters } from 'src/app/shared/interface/filters';
import { Products } from 'src/app/shared/interface/products';
import { environment } from 'src/environments/environment';

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

        console.log('API Response:', response);
        return response.products || response;
      })
    );
  }

  public getAllProductsWithFilter(filters: Filters): Observable<Products[]> {
    const url = 'https://dummyjson.com/products?limit=0';
    return this.http.get<any>(url).pipe(
      map(response => {
        let allProducts = response.products || response;

        if (filters.multiplesCategories && filters.multiplesCategories.length > 0) {
          allProducts = allProducts.filter((product: Products) =>
            filters.multiplesCategories.some(category =>
              category.toLowerCase() === product.category.toLowerCase()
            )
          );
          console.log('Filtrado por categorias:', filters.multiplesCategories);
          console.log('Produtos após filtro:', allProducts);
        }
        if (filters.price > 0) {
          allProducts = allProducts.filter((product: Products) => product.price <= filters.price);
        }
        if ((filters as any).minPrice > 0) {
          allProducts = allProducts.filter((product: Products) => product.price >= (filters as any).minPrice);
        }
        if (filters.rating > 0) {
          const ratingFilter = Number(filters.rating);
          allProducts = allProducts.filter((product: Products) => {
            const productRatingInt = Math.floor(product.rating);
            const match = productRatingInt === ratingFilter;
            if (!match) {
              console.log(`Produto ${product.title} ignorado: rating ${product.rating} (int: ${productRatingInt}) != filtro ${ratingFilter}`);
            }
            return match;
          });
        }
        return allProducts;
      })
    );
  }

  public getProductsById(id: string | null): Observable<Products> {
    const url = `${this.url}/products/${id}`;
    return this.http.get<Products>(url);
  }
}
