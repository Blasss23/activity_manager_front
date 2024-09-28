import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthStudentGuard } from 'src/app/core/Guard/Student/AuthStudent.guard';
import { StudentRouterGuard } from "src/app/core/Guard/Student/StudentRouter.guard";
import { ContentLayoutComponent } from './page/content-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '', redirectTo: 'auth', pathMatch: 'full'
      },
      {
        path: "auth",
        canActivate: [AuthStudentGuard],
        loadChildren: () => import('../page/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: "Dashboard",
        canActivate: [StudentRouterGuard],
        loadChildren: () => import('../page/Dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: "Register_subject",
        canActivate: [StudentRouterGuard],
        loadChildren: () => import('../page/registration-code-subject/registration-code-subject.module').then(m => m.RegistrationCodeSubjectModule)
      },
      {
        path: 'Activity',
        canActivate: [StudentRouterGuard],
        loadChildren: () => import('../page/activity/activity.module').then(m => m.ActivityModule)
      },
      {
        path: 'Subjects',
        canActivate: [StudentRouterGuard],
        loadChildren: () => import('../page/subject/subject.module').then(m => m.SubjectModule)
      },
      { path: '**', redirectTo: 'auth', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentLayoutRoutingModule { }
