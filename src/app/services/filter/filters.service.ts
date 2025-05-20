import { Filters } from '@interfaces/filters';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public category = '';
  public multiplesCategories = [];
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
