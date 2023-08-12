import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [ButtonModule],
})
export class ButtonComponent {
  @Input() public label = '';
  @Input() public icon = '';
  @Input() public color = '';
  @Input() public iconPos!: string;

  @Input() public loading!: boolean;

  public load(): void {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
