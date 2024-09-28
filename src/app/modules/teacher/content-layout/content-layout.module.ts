import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentLayoutRoutingModule } from './content-layout-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { ContentLayoutComponent } from './page/content-layout.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TeacherRouterGuard } from 'src/app/core/Guard/Teacher/TeacherRouter.guard';
import { AuthTeacherGuard } from 'src/app/core/Guard/Teacher/AuthTeacher.guard';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

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
