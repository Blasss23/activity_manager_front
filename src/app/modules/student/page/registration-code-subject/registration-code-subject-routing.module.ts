import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCodeComponent } from './page/register-code.component';

const routes: Routes = [{
  path: '',
  component: RegisterCodeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationCodeSubjectRoutingModule { }
