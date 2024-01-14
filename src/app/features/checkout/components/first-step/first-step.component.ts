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
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

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
    TriStateCheckboxModule,
    ReactiveFormsModule,
    RouterLink,
    TranslocoModule,
  ],
})
export class FirstStepComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private _messageService = inject(MessageService);
  private _destroyRef = inject(DestroyRef);

  public form!: FormGroup;

  public ngOnInit(): void {
    this.form = this._fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern(regex.char),
        ]),
      ],

      email: [
        '',
        Validators.compose([Validators.required, Validators.pattern(regex.email)]),
      ],
    });

    const savedForm = localStorage.getItem('saved_checkout_form_step_1');

    if (savedForm) {
      this.form.setValue(JSON.parse(savedForm));
    }

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(formData => {
        localStorage.setItem('saved_checkout_form_step_1', JSON.stringify(formData));
      });
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.form.getRawValue();
      this._router.navigate(['/checkout/second-step']);
    } else {
      this._messageService.add({
        severity: 'error',
        summary: 'Dados inválidos',
        detail: 'Verifique os campos destacados.',
        life: 1000,
      });
    }
  }
}
