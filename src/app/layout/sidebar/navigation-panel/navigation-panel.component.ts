import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.scss'],
  standalone: true,
  imports: [MenuModule],
})
export class NavigationPanelComponent implements OnInit {
  public navigationMenuItems!: MenuItem[];

  public ngOnInit(): void {
    this.getItemsForThePanelNavigationMenu();
  }

  public getItemsForThePanelNavigationMenu(): void {
    this.navigationMenuItems = [
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
