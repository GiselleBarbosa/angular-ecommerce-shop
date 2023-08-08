import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
  standalone: true,
  imports: [MenubarModule, NgIf],
})
export class MenubarComponent implements OnInit {
  public items: MenuItem[] | undefined;

  @Input() public setButtonTheme!: boolean;
  @Output() public toggleTheme = new EventEmitter();

  public ngOnInit(): void {
    this.items = [
      {
        label: 'Products',
        icon: 'pi pi-fw pi-gift',
        items: [
          {
            label: 'Categories',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark',
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video',
              },
            ],
          },

          {
            separator: true,
          },

          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link',
          },
        ],
      },

      {
        label: 'Cart',
        icon: 'pi pi-fw pi-shopping-cart',
      },

      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off',
      },
    ];
  }

  public toggleThemeClicked(): void {
    this.toggleTheme.emit();
  }
}
