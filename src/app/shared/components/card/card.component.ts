import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [CardModule, ButtonComponent],
})
export class CardComponent {}
