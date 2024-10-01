import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationCodeSubjectRoutingModule } from './registration-code-subject-routing.module';
import { RegisterCodeComponent } from './page/register-code.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { CoreModule } from 'src/app/core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';


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
