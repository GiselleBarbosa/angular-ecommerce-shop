import { Component } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Product } from 'src/app/modules/products/interface/Product';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  standalone: true,
  imports: [DataViewModule, RatingModule, TagModule, FormsModule],
})
export class DataViewComponent {
  public layout = 'list';

  public products!: Product[];

  public getSeverity(product: Product): string | null {
    switch (product.status) {
      case 'New':
        return 'success';

      case 'Used':
        return 'warning';

      default:
        return null;
    }
  }
}
