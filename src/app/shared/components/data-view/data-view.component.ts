import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { Product } from 'src/app/modules/products/interface/Product';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  standalone: true,
  imports: [DataViewModule, RatingModule, TagModule, FormsModule],
})
export class DataViewComponent {
  public layout = 'list';

  @Input() public products!: Product[];

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
