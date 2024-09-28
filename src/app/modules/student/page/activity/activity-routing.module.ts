import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailActivityComponent } from './detail-activity/detail-activity.component';
import { ListActivityComponent } from './list-activity/list-activity.component'; 

const routes: Routes = [
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'list',
    component:ListActivityComponent
  },
  {
    path:'detail/:id',
    component:DetailActivityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
