import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegisterSubjectService } from 'src/app/core/service/Student/Register_subject/RegisterSubjectService.service';

@Component({
  selector: 'app-register-code',
  templateUrl: './register-code.component.html',
  styleUrls: ['./register-code.component.scss']
})
export class RegisterCodeComponent implements OnInit, OnDestroy {
  FormCode: UntypedFormGroup;
  Code: string = '';
  private _unsubscribe = new Subject<void>();
  constructor(private fb: UntypedFormBuilder, private register_subjet: RegisterSubjectService, private router: Router, private toast: ToastrService) {
    this.FormCode = this.fb.group(
      {
        Code: [
          this.Code,
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10)
          ]
        ]
      }
    )
  }

  ngOnInit(): void {

  }

  get f1() { return (this.FormCode.controls as any); }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  register_subject() {
    if (this.FormCode.valid) {
      this.register_subjet.register_subject(this.FormCode.value.Code).pipe(takeUntil(this._unsubscribe)).subscribe(data => {
        setTimeout(() => {
          this.toast.success("Successful registration")
          this.router.navigate(['/student/Dashboard'])
        }, 1000);

      })
    }
  }

}
