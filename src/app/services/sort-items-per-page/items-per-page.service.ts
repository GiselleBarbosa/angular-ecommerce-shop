import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ItemsPerPageService {
  public quantityItemsOptions = (): SelectItem[] => {
    return [
      {
        value: '10',
        label: '10 por página',
      },
      {
        value: '20',
        label: '20 por página',
      },

      {
        value: '30',
        label: '30 por página',
      },
    ];
  };
}
