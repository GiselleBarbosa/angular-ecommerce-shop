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

  public updateFilters(filters: Partial<Filters>): void {
    if (filters.price !== undefined) this.price = filters.price;
    if (filters.rating !== undefined) this.rating = filters.rating;
    if (filters.category !== undefined) this.category = filters.category;
    if (filters.multiplesCategories)
      this.multiplesCategories = [...filters.multiplesCategories];
  }

  public getRequests(): void {
    const filters = {
      price: this.price,
      rating: this.rating,
      category: this.category,
      multiplesCategories: this.multiplesCategories,
    };
    console.log('Emitting filters:', filters);
    this._getAllProductsWithFilterObservable.next(filters);
  }
}
