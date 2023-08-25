import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  standalone: true,
  imports: [MultiSelectModule, FormsModule],
})
export class MultiSelectComponent {
  @Input() public categories!: any[];
  @Input() public selectedCategories!: any[];
  @Input() public defaultLabel!: string;
}
