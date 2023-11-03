import { Injectable } from '@angular/core';
import { MenuChangeEvent } from '../../interface/menuchangeevent';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuSource = new Subject<MenuChangeEvent>();
  private resetSource = new Subject();

  public readonly menuSource$ = this.menuSource.asObservable();
  public readonly resetSource$ = this.resetSource.asObservable();

  public onMenuStateChange(event: MenuChangeEvent): void {
    this.menuSource.next(event);
  }

  public reset(): void {
    this.resetSource.next(true);
  }
}
