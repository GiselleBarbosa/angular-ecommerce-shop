import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  standalone: true,
  imports: [CardModule, ButtonModule, RouterLink, TranslocoModule],
})
export class LogoutComponent {}
