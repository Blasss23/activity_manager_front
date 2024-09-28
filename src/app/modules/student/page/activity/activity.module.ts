import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ListActivityComponent } from './list-activity/list-activity.component';
import { DetailActivityComponent } from './detail-activity/detail-activity.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CoreModule } from 'src/app/core/core.module';
import { MatPaginatorModule} from '@angular/material/paginator'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {MatChipsModule} from '@angular/material/chips';  
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
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
