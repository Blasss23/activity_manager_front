import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'; 
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { AuthTeacherService } from 'src/app/core/service/Teacher/Auth/AuthTeacher.service';
@Component({
  selector: 'app-recoverypassword',
  templateUrl: './recoverypassword.component.html',
  styleUrls: ['./recoverypassword.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.5s ease-out',
              style({ height: '*', opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: '*', opacity: 1 }),
            animate('0.5s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class RecoverypasswordComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();
  public hide1 = true;
  public hide2 = true;
  show: boolean = false;
  FormEmail: FormGroup;
  tokencaptcha: string = '';
  CheckRegister: boolean = false;
  Email: string = '';
  constructor(private fb: FormBuilder, public service: AuthTeacherService, public toast: ToastrService, public router: Router) {
    this.FormEmail = this.fb.group(
      {
        Email: [
          this.Email,
          [
            Validators.required,
            Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
          ]
        ]
      }
    )
  }

  get f1() { return (this.FormEmail.controls as any); }

  ngOnInit(): void {

  }
  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  submit(stepper: MatStepper) {
    if (this.FormEmail.valid) {
      this.service.Send_email_recovery(this.FormEmail.value.Email).pipe(takeUntil(this._unsubscribe)).subscribe(data => {
        this.CheckRegister = true;
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
