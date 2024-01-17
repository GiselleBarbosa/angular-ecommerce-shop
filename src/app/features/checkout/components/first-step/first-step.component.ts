import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CustomMessageComponent } from 'src/app/shared/custom-message/custom-message.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { regex } from 'src/app/core/regex/regex';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-first-step',
  standalone: true,
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    InputMaskModule,
    CustomMessageComponent,
    ReactiveFormsModule,
    RouterLink,
    TranslocoModule,
  ],
})
export class FirstStepComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  public form!: FormGroup;

  public ngOnInit(): void {
    this.initializeForm();

    const savedForm = localStorage.getItem('saved_checkout_form_step_1');

    if (savedForm) {
      this.form.setValue(JSON.parse(savedForm));
    }

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(formData => {
        localStorage.setItem('saved_checkout_form_step_1', JSON.stringify(formData));
      });
  }

  public initializeForm(): void {
    this.form = this._fb.group({
      name: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern(regex.char),
        ]),
      ],

      cpf: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.pattern(regex.cpf),
        ]),
      ],

      birthday: [null, Validators.required],

      mobile: [
        null,
        Validators.compose([Validators.required, Validators.pattern(regex.phone)]),
      ],
      email: [
        null,
        Validators.compose([Validators.required, Validators.pattern(regex.email)]),
      ],

      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
        ]),
      ],

      confirmPassword: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
        ]),
      ],
    });
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.form.getRawValue();
      this.messageService.add({
        severity: 'success',
        summary: 'Dados pessoais foram salvos',
        life: 500,
      });
      this._router.navigate(['/checkout/second-step']);
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
