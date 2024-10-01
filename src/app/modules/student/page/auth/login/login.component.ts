import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { login_model } from 'src/app/core/model/login.model';
import { AuthStudentService } from 'src/app/core/service/Student/Auth/AuthStudent.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  private _unsubscribe = new Subject<void>();
  public hide = true;
  FormLoginFG: UntypedFormGroup;
  FormLogin: login_model = new login_model;
  constructor(private fb: UntypedFormBuilder, public service: AuthStudentService, public toast: ToastrService, public router: Router) {

    this.FormLoginFG = this.fb.group(
      {
        user: [this.FormLogin.user, [Validators.required]
        ],
        password: [this.FormLogin.password, [Validators.required]]
      }
    )
  }
  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.hide = false;
    }, 500);
  }

  Submit() {
    if (this.FormLoginFG.valid) {
      this.service.Login(this.FormLoginFG.value).pipe(takeUntil(this._unsubscribe)).subscribe(data => {
        this.toast.success("successful login");
        localStorage.setItem('type_user', 'student');
        this.router.navigate(['/student/Dashboard'])
      })
    }
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.Submit()
    }
  }
}
