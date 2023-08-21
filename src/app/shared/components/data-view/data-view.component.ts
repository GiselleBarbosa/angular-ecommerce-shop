import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { Product } from 'src/app/modules/products/interface/Product';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  standalone: true,
  imports: [
    DataViewModule,
    RatingModule,
    TagModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
  ],
})
export class DataViewComponent {
  @Input() public product: Product[] = [];

  @Input() public sortOptions!: SelectItem[];

  @Input() public sortOrder!: number;

  @Input() public sortField!: string;

  @Input() public sortKey!: string;

  @Output() public sortChange = new EventEmitter<Event>();

  public sortChangeClicked(event: Event): void {
    this.sortChange.emit(event);
  }

  public getSeverity(product: Product): string | null {
    switch (product.status) {
      case 'new':
        return 'success';

      case 'used':
        return 'warning';

      default:
        return null;
    }
  }
}
