import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './page/content-layout.component';
import { TeacherRouterGuard } from "src/app/core/Guard/Teacher/TeacherRouter.guard";
import { AuthTeacherGuard } from 'src/app/core/Guard/Teacher/AuthTeacher.guard'; 
import { OptionsComponent } from './page/options/options.component';
import { MainGuard } from 'src/app/core/Guard/main/Main.Guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[MainGuard],
    component: ContentLayoutComponent,
    children: [ 
      {
        path:'',
        component:OptionsComponent
      } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentLayoutRoutingModule { }
