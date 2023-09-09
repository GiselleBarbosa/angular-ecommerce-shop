import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/modules/products/interface/categories';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private productsUrl = environment.productsUrl;

  private http = inject(HttpClient);

  public getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.productsUrl}/products/categories`);
  }
}
