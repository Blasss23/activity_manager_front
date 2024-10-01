import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentLayoutRoutingModule } from './content-layout-routing.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { ContentLayoutComponent } from './page/content-layout.component';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { TeacherRouterGuard } from 'src/app/core/Guard/Teacher/TeacherRouter.guard';
import { AuthTeacherGuard } from 'src/app/core/Guard/Teacher/AuthTeacher.guard';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
  declarations: [
    ContentLayoutComponent
  ],
  imports: [
    CommonModule,
    ContentLayoutRoutingModule,
    MatCardModule, 
    MatToolbarModule, 
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule
  ], providers: [
    AuthTeacherGuard,
    TeacherRouterGuard
  ]
})
export class ContentLayoutModule { }
