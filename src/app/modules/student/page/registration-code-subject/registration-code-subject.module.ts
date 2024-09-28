import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationCodeSubjectRoutingModule } from './registration-code-subject-routing.module';
import { RegisterCodeComponent } from './page/register-code.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreModule } from 'src/app/core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    RegisterCodeComponent
  ],
  imports: [
    CommonModule,
    RegistrationCodeSubjectRoutingModule,
    CoreModule,  
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule, 
    ReactiveFormsModule,
  ]
})
export class RegistrationCodeSubjectModule { }
