import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  public categories: string[] = [];
  public rating = 0;

  private getRequestsSubscription = new Subject<null>();
  public readonly getRequests$ = this.getRequestsSubscription.asObservable();

  public getRequests(): void {
    this.getRequestsSubscription.next(null);
  }
}
