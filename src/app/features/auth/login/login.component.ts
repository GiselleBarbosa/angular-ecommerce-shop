import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from 'src/app/features/auth/services/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CustomMessageComponent } from 'src/app/shared/custom-message/custom-message.component';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    ReactiveFormsModule,
    TranslocoModule,
    RouterLink,
    CustomMessageComponent,
  ],
})
export class LoginComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _messageService = inject(MessageService);

  public form!: FormGroup;

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
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

    const adminAuth = 'admin@email.com';
    const adminPasswordAuth = '123456';

    const userLoggedInData = this.form.getRawValue();

    const isAdminLoggedIn =
      this.form.get('email')?.value === adminAuth &&
      this.form.get('password')?.value === adminPasswordAuth &&
      this.form.valid
        ? true
        : false;

    if (isAdminLoggedIn) {
      this._messageService.add({
        severity: 'success',
        summary: 'Bem vindo(a) Administrador',
        detail: 'login realizado com sucesso.',
        life: 1500,
      });
      userLoggedInData;

      setTimeout(() => {
        this._router.navigate(['/admin']);
        this._authService.login();
        localStorage.setItem(
          'saved_admin_loggedIn',
          JSON.stringify(this._authService.isLoggedIn)
        );
      }, 1200);
    } else if (!isAdminLoggedIn && this.form.valid) {
      this._messageService.add({
        severity: 'success',
        summary: 'Bem vindo(a) cliente ',
        detail: 'login realizado com sucesso.',
        life: 1500,
      });
      userLoggedInData;
      setTimeout(() => {
        this._router.navigate(['/products']);
        this._authService.isLoggedIn = true;
        localStorage.setItem(
          'saved_user_loggedIn',
          JSON.stringify(this._authService.isLoggedIn)
        );
      }, 1200);
    }
  }
}
