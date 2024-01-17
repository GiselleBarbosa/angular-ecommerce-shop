import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CustomMessageComponent } from 'src/app/shared/custom-message/custom-message.component';
import { FindAddressService } from './services/find-address.service';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { regex } from 'src/app/core/regex/regex';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    ConfirmDialogModule,
  ],
})
export class SecondStepComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);
  private messageService = inject(MessageService);
  private destroyRef = inject(DestroyRef);
  private findAddressService = inject(FindAddressService);

  public form!: FormGroup;

  public ngOnInit(): void {
    this.initializeForm();

    const savedForm = localStorage.getItem('saved_checkout_form_step_2');

    if (savedForm) {
      this.form.setValue(JSON.parse(savedForm));
    }

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(formData => {
        localStorage.setItem('saved_checkout_form_step_2', JSON.stringify(formData));
      });
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
    });
  }

  public PopulateFields(): void {
    const zipcode = this.form.get('zipcode')?.value;

    if (zipcode && zipcode.length === 9) {
      this.findAddressService
        .findAddress(zipcode)
        .pipe(take(1))
        .subscribe(responseApi => {
          this.form.patchValue({
            address: responseApi.logradouro,
            neighborhood: responseApi.bairro,
            city: responseApi.localidade,
            uf: responseApi.uf,
          });
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Dados inválidos',
        detail: 'Verifique se o cep esta correto.',
        life: 1000,
      });
    }
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();

    console.log(this.form.value);

    if (this.form.valid) {
      this.form.getRawValue();
      this.messageService.add({
        severity: 'success',
        summary: 'Endereço foi salvo com sucesso',
        life: 1000,
      });
      this._router.navigate(['/checkout/third-step']);
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
