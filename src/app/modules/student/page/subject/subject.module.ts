import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import { CoreModule } from 'src/app/core/core.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { DetailSubjectsComponent } from './detail-subjects/detail-subjects.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    ListSubjectsComponent,
    DetailSubjectsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SubjectRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatPaginatorModule, 
    MatCardModule,
    MatFormFieldModule,     
    MatChipsModule
  ]
})
export class SubjectModule { }
