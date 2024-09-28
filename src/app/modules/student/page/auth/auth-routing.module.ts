import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LoginComponent } from './login/login.component';
import { RecoverypasswordComponent } from './recoverypassword/recoverypassword.component';
import { SingupComponent } from './singup/singup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "login",
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "singup",
    component: SingupComponent
  },
  {
    path: "recoverypassword",
    component: RecoverypasswordComponent
  },
  {
    path: "changepassword/:token",
    component: ChangepasswordComponent
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
