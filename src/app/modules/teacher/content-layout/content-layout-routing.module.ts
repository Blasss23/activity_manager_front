import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './page/content-layout.component';
import { TeacherRouterGuard } from "src/app/core/Guard/Teacher/TeacherRouter.guard";
import { AuthTeacherGuard } from 'src/app/core/Guard/Teacher/AuthTeacher.guard'; 

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
        canActivate:[AuthTeacherGuard],
        loadChildren: () => import('../page/auth/auth.module').then(m => m.AuthModule)
      }, 
      {
        path: "Dashboard",
        canActivate:[TeacherRouterGuard],
        loadChildren: () => import('../page/dashboard/dashboard.module').then(m => m.DashboardModule)
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
