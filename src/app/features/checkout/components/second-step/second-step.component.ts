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
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
  standalone: true,
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
export class SecondStepComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);

  public form!: FormGroup;

  public ngOnInit(): void {
    this.initializeForm();
  }

  public initializeForm(): void {
    this.form = this._fb.group({
      zipcode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(9),
          Validators.minLength(9),
          Validators.pattern(regex.zipcodePattern),
        ]),
      ],
      address: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
          Validators.pattern(regex.alphabeticPattern),
        ]),
      ],
      number: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(1),
          Validators.pattern(regex.numericPattern),
        ]),
      ],
      complement: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(35),
          Validators.minLength(1),
        ]),
      ],
      reference: [
        '',
        Validators.compose([Validators.maxLength(40), Validators.minLength(1)]),
      ],
      neighborhood: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(3),
        ]),
      ],
      city: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(3),
        ]),
      ],
      uf: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(2),
          Validators.minLength(2),
        ]),
      ],
      country: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(3),
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
