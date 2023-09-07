import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  standalone: true,
  imports: [DataViewModule, RatingModule, FormsModule, DropdownModule, ButtonModule],
})
export class DataViewComponent {
  @Input() public items!: any[];

  @Input() public sortOptions!: SelectItem[];
  @Input() public sortOrder!: number;
  @Input() public sortField!: string;

  @Output() public sortChange = new EventEmitter();

  public sortChangeClicked($event: any): void {
    this.sortChange.emit($event);
  }
}
