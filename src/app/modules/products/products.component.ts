import { Component } from '@angular/core';
import { CardComponent } from 'src/app/shared/components/card/card.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CardComponent],
})
export class ProductsComponent {}
