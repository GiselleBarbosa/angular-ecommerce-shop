import { Component, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-custom-message',
  templateUrl: './custom-message.component.html',
  styleUrls: ['./custom-message.component.scss'],
  standalone: true,
  imports: [NgIf, TranslocoModule],
})
export class CustomMessageComponent {
  @Input() public minLength!: number;
  @Input() public maxLength!: number;
  @Input() public required!: string;
  @Input() public pattern!: string;
  @Input() public email!: string;

  @Input() public form!: FormGroup;
  @Input() public field!: string;

  public hasError(): boolean {
    const control = this.form.get(this.field);

    if (control && control.invalid && (control.dirty || control.touched)) {
      return true;
    } else {
      return false;
    }
  }
}
