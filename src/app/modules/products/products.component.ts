import { Component } from '@angular/core';
import { DataViewComponent } from 'src/app/shared/components/data-view/data-view.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [DataViewComponent],
})
export class ProductsComponent {}
