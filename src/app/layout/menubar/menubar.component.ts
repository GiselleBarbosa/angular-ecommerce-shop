import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
  standalone: true,
  imports: [MenubarModule, NgIf, RouterLink],
})
export class MenubarComponent implements OnInit {
  public items: MenuItem[] | undefined;
  private router = inject(Router);

  @Input() public setButtonTheme!: boolean;
  @Output() public toggleTheme = new EventEmitter();

  public ngOnInit(): void {
    this.items = [
      {
        label: 'Products',
        icon: 'pi pi-fw pi-gift',
        command: () => this.router.navigate(['products']),
        items: [
          {
            label: 'Categories',
            items: [
              {
                label: 'Pending',
              },
            ],
          },
        ],
      },

      {
        label: 'Cart',
        icon: 'pi pi-fw pi-shopping-cart',
        command: () => this.router.navigate(['cart']),
      },
    ];
  }

  public toggleThemeClicked(): void {
    this.toggleTheme.emit();
  }
}
