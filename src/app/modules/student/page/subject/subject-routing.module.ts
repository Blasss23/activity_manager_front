import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailSubjectsComponent } from './detail-subjects/detail-subjects.component';
import { ListSubjectsComponent } from './list-subjects/list-subjects.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'list',
    component:ListSubjectsComponent
  },
  {
    path:'detail/:id',
    component:DetailSubjectsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
