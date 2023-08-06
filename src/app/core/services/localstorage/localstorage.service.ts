import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  private _storage!: Storage;

  constructor() {
    this._storage = window.localStorage;
  }

  public set(key: string, value: any): boolean {
    if (this._storage) {
      this._storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  public get(key: string): any {
    if (this._storage) {
      return this._storage.getItem(key);
    }
  }

  public remove(key: string): boolean {
    if (this._storage) {
      this._storage.removeItem(key);
      return true;
    }
    return false;
  }

  public clear(): boolean {
    if (this._storage) {
      this._storage.clear();
      return true;
    }
    return false;
  }
}
