import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ListActivityComponent } from './list-activity/list-activity.component';
import { DetailActivityComponent } from './detail-activity/detail-activity.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { CoreModule } from 'src/app/core/core.module';
import { MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator'; 
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field'; 
import {MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';  
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import { ModalComponent } from './modal/modal.component';
@NgModule({
  declarations: [
    ListActivityComponent,
    DetailActivityComponent,
    ModalComponent, 
  ],
  imports: [
    CommonModule,
    CoreModule,
    ActivityRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,  
    MatChipsModule,  
    MatInputModule, 
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class ActivityModule { }
