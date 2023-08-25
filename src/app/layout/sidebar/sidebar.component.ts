import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { SidebarModule } from 'primeng/sidebar';
import { first } from 'rxjs';
import { Categories } from 'src/app/modules/products/interface/categories';
import { ProductService } from 'src/app/modules/products/services/product.service';
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
  private _productsService = inject(ProductService);

  public sidebarVisible = true;

  public navigationMenuItems!: MenuItem[];

  private categoryId!: string | null;

  public categories!: Categories[];
  public selectedCategories!: Categories[];

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
      .pipe(first())
      .subscribe(category => {
        this.categories = category;
      });
  }
}
