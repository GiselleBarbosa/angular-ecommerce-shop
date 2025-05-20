import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filters } from 'src/app/shared/interface/filters';
@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public category = '';
  public multiplesCategories: string[] = [];
  public price = 0;
  public rating = 0;

  private _getAllProductsWithFilterObservable = new Subject<Filters>();
  public readonly getAllProductsWithFilter$ =
    this._getAllProductsWithFilterObservable.asObservable();

  public getRequests(): void {
    const filters = {
      price: this.price,
      rating: this.rating,
      category: this.category,
      multiplesCategories: this.multiplesCategories,
    };
    this._getAllProductsWithFilterObservable.next(filters);
  }
}
