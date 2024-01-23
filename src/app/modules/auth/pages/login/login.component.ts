import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthClientService } from '../../../../core/client-services/auth/auth-client.service';
import { SpinnerService } from '../../../../core/services/spinner/spinner.service';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../../../core/services/current-user/current-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  error?:string;
  loginFormGroup: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private authClientService: AuthClientService,
    private currentUserService: CurrentUserService,
    private spinnerService: SpinnerService,
    private router: Router
  ) {
    this.loginFormGroup = formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  onLogin() {
    if (!this.loginFormGroup.valid) {
      return;
    }

    this.spinnerService.display();
    this.authClientService
      .login(
        this.loginFormGroup.value.username,
        this.loginFormGroup.value.password
      )
      .subscribe({
        next: (auth) => {
          this.currentUserService.login(auth.userId, auth.userName);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = error;
          this.spinnerService.hide();
        },
        complete: () => {
          this.spinnerService.hide();
        },
      });
  }
}
