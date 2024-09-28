import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "main"
  },
  {
    path: "main",
    loadChildren: () => import('./modules/main/content-layout/content-layout.module').then(m => m.ContentLayoutModule)
  },
  {
    path: "student",
    loadChildren: () => import('./modules/student/content-layout/content-layout.module').then(m => m.ContentLayoutModule)
  },
  {
    path: "teacher",
    loadChildren: () => import('./modules/teacher/content-layout/content-layout.module').then(m => m.ContentLayoutModule)
  },
  { path: '**', redirectTo: 'student', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
