import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'; 
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { matchesPass } from 'src/app/core/validator/custom.validators';
import { AuthTeacherService } from 'src/app/core/service/Teacher/Auth/AuthTeacher.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit, OnDestroy {

  private _unsubscribe = new Subject<void>();
  public hide1 = true;
  public hide2 = true;
  tokencaptcha: string = '';
  CheckUpdate: boolean = false;
  FormChangePassword: UntypedFormGroup;
  FormChangePass = {
    newPassword: '',
    confiPassword: ''
  }
  token: string | null = null;

  constructor(private fb: UntypedFormBuilder, public service: AuthTeacherService, public toast: ToastrService, public router: Router, private route: ActivatedRoute) {

    this.token = this.route.snapshot.paramMap.get('token');

    this.FormChangePassword = this.fb.group(
      {
        newPassword: [
          this.FormChangePass.newPassword,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern("^[a-zA-Z0-9.@_-]+$"),
          ]
        ],
        confiPassword: [
          this.FormChangePass.confiPassword,
          [
            Validators.required,
            matchesPass
          ]
        ]
      }
    )

  }

  get f1() { return (this.FormChangePassword.controls as any); }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/student/auth/login'])
    }
  }

  submit(stepper: MatStepper) {
    if (this.FormChangePassword.valid) {
      this.service.Update_password(this.FormChangePassword.value, this.token).pipe(takeUntil(this._unsubscribe)).subscribe(data => {
        this.CheckUpdate = true;
        this.toast.success(data.message);
        setTimeout(() => {
          stepper.next();
        }, 1000);
      })
    }
  }

  resolved(captchaResponse: string) {
    this.tokencaptcha = captchaResponse;
  }

}
