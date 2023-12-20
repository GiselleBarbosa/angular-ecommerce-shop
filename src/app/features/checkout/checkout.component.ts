import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { RouterOutlet } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [StepsModule, RouterOutlet, TranslocoModule],
})
export class CheckoutComponent implements OnInit {
  public items!: MenuItem[];

  public ngOnInit(): void {
    this.items = [
      {
        label: 'Dados pessoais',
        target: 'personal-data',
        routerLink: 'personal-data',
      },
      {
        label: 'Dados da entrega',
        routerLink: 'shipping',
      },
      {
        label: 'Dados do pagamento',
        routerLink: 'payment',
      },
      {
        label: 'Confirmação do pedido',
        routerLink: 'confirmation',
      },
    ];
  }
}
