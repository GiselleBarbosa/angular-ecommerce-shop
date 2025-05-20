import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class PriceOrderService {
  public orderPriceOptions = (): SelectItem[] => {
    return [
      { label: 'Preço decrescente', value: '!unitPrice' },
      { label: 'Preço crescente', value: 'unitPrice' },
    ];
  };
}
