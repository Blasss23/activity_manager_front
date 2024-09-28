import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { RecoverypasswordComponent } from './recoverypassword/recoverypassword.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CoreModule } from 'src/app/core/core.module'; 
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import { RecaptchaModule } from "ng-recaptcha";
import { ChangepasswordComponent } from './changepassword/changepassword.component';
@NgModule({
  declarations: [
    LoginComponent,
    SingupComponent,
    RecoverypasswordComponent,
    ChangepasswordComponent, 
  ],
  imports: [
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
    
    
  ],providers:[]
})
export class AuthModule { }
