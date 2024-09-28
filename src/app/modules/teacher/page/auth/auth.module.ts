import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RecoverypasswordComponent } from './recoverypassword/recoverypassword.component';
import { SingupComponent } from './singup/singup.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { RecaptchaModule } from 'ng-recaptcha';


@NgModule({
  declarations: [
    LoginComponent,
    RecoverypasswordComponent,
    SingupComponent,
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonModule,
    CoreModule,
    AuthRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatStepperModule,
    RecaptchaModule
  ]
})
export class AuthModule { }
