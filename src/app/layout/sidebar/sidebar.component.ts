import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { map } from 'rxjs';
import { ProductService } from 'src/app/modules/products/services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [SidebarModule, ButtonModule, FormsModule, MenuModule, MultiSelectModule],
})
export class SidebarComponent implements OnInit {
  private _productsService = inject(ProductService);

  public sidebarVisible = true;

  public navigationMenuItems!: MenuItem[];

  public categories!: MenuItem[];
  public selectedCategories!: MenuItem[];

  public ngOnInit(): void {
    this.getItemsForThePanelNavigationMenu();
    this.getItemCategoriesMenu();
  }

  public sidebarHandler(): void {
    this.sidebarVisible = true;
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

  public getItemCategoriesMenu(): void {
    this._productsService
      .getAllCategories()
      .pipe(
        map(category => {
          this.categories = category.map(category => {
            return {
              label: category.name,
              routerLink: `products/category/${category.id}`,
            };
          });
        })
      )
      .subscribe();
  }
}
