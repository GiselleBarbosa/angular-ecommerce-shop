import { inject, Injectable } from '@angular/core';

import { Address } from '../interfaces/address.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FindAddressService {
  private http = inject(HttpClient);

  public findAddress(cep: string): Observable<Address> {
    return this.http.get<Address>(`https://viacep.com.br/ws/${cep}/json`);
  }
}
