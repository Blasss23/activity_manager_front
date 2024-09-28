import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStudentService } from './service/Student/Auth/AuthStudent.service';
import { LoadingService } from './service/common/loading.service';
import { AuthTeacherService } from './service/Teacher/Auth/AuthTeacher.service';
import { DashboardService } from './service/Student/Dashboard/Dashboard.service';
import { RegisterSubjectService } from './service/Student/Register_subject/RegisterSubjectService.service';
import { ActivityService } from './service/Activity/Activity.service';
import { SubjectService } from './service/Subject/Subject.service'; 
import { DashboardServiceT } from './service/Teacher/Dashboard/Dashboard.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ], providers: [
    AuthStudentService,
    AuthTeacherService,
    LoadingService,
    DashboardService,
    DashboardServiceT,
    RegisterSubjectService,
    ActivityService,
    SubjectService, 
  ]
})
export class CoreModule { }
