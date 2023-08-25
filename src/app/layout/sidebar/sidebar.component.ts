import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { MultiSelectComponent } from 'src/app/shared/components/multi-select/multi-select.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    MenuModule,
    MultiSelectModule,
    MultiSelectComponent,
  ],
})
export class SidebarComponent implements OnInit {
  public sidebarVisible = true;
  public items: MenuItem[] | undefined;

  public sidebarHandler(): void {
    this.sidebarVisible = true;
  }

  public ngOnInit(): void {
    this.items = [
      {
        label: 'Cart',
        icon: 'pi pi-shopping-cart',
        routerLink: '/cart',
      },

      {
        label: 'Login',
        icon: 'pi pi-user',
        routerLink: 'auth/login',
      },

      {
        label: 'Translate',
        icon: 'pi pi-language',
        command: (): void => {
          alert('pending implementation');
        },
      },
    ];
  }
}
