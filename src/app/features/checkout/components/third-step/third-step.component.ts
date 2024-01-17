import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CustomMessageComponent } from 'src/app/shared/custom-message/custom-message.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { regex } from 'src/app/core/regex/regex';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    CustomMessageComponent,
    ReactiveFormsModule,
    TranslocoModule,
    InputMaskModule,
  ],
})
export class ThirdStepComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  public form!: FormGroup;

  public ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.form = this._fb.group({
      card: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
          Validators.pattern(regex.numericPattern),
        ]),
      ],

      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(7),
          Validators.pattern(regex.alphabeticPattern),
        ]),
      ],

      cvv: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(3),
          Validators.minLength(3),
        ]),
      ],

      installment: [null, Validators.required],
    });
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.form.getRawValue();
      this.messageService.add({
        severity: 'success',
        summary: 'Pagamento realizado com sucesso',
        life: 1000,
      });
      // adicionar algum modal de confirmacao
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Dados inválidos',
        detail: 'Verifique os campos destacados.',
        life: 1000,
      });
    }
  }
}
