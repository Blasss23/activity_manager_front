import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import { CoreModule } from 'src/app/core/core.module';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {MatDividerModule} from '@angular/material/divider';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { DetailSubjectsComponent } from './detail-subjects/detail-subjects.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';


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
