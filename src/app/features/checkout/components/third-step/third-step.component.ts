import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CustomMessageComponent } from 'src/app/shared/custom-message/custom-message.component';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InstallmentOptions } from './interfaces/installmentOptions.interface';
import { MessageService } from 'primeng/api';
import { regex } from 'src/app/core/regex/regex';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    DropdownModule,
    DialogModule,
    RouterLink,
  ],
})
export class ThirdStepComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  public form!: FormGroup;

  public installment!: InstallmentOptions[];

  public isVisibleDialog = true;

  public ngOnInit(): void {
    this.initializeForm();
    this.setInstallmentValues();

    const savedForm = localStorage.getItem('saved_checkout_form_step_3');

    if (savedForm) {
      this.form.setValue(JSON.parse(savedForm));
    }

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(formData => {
        localStorage.setItem('saved_checkout_form_step_3', JSON.stringify(formData));
      });
  }

  public initializeForm(): void {
    this.form = this._fb.group({
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(7),
          Validators.pattern(regex.alphabeticPattern),
        ]),
      ],

      cardNumber: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(19),
          Validators.minLength(19),
          Validators.pattern(regex.creditCard),
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

  public setInstallmentValues(): void {
    this.installment = [
      { key: 'Á vista', value: '1' },
      { key: '2x sem juros', value: '2' },
      { key: '3x sem juros', value: '3' },
      { key: '10x com juros', value: '10' },
      { key: '12x com juros', value: '12' },
    ];
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.showDialog();
      localStorage.removeItem('saved_checkout_form_step_3');
      localStorage.removeItem('saved_checkout_form_step_2');
      localStorage.removeItem('saved_checkout_form_step_1');
      this.form.reset();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Dados inválidos',
        detail: 'Verifique os campos destacados.',
        life: 1000,
      });
    }
  }

  public showDialog(): void {
    this.isVisibleDialog = !this.isVisibleDialog;
  }
}
