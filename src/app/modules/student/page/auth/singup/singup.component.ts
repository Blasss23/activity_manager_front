import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthStudentService } from 'src/app/core/service/Student/Auth/AuthStudent.service';
import { matchesPass } from 'src/app/core/validator/custom.validators';
import { ToastrService } from 'ngx-toastr';
import { singup_model } from 'src/app/core/model/singup.model';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
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
export class SingupComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();
  public hide1 = true;
  public hide2 = true;
  show: boolean = false;
  FormSingup1: UntypedFormGroup;
  FormSingup2: UntypedFormGroup;
  CheckRegister: boolean = false;
  tokencaptcha: string = '';
  FormSingup: singup_model = new singup_model;
  constructor(private fb: UntypedFormBuilder, public service: AuthStudentService, public toast: ToastrService, public router: Router) {
    this.FormSingup1 = this.fb.group(
      {
        frist_name: [
          this.FormSingup.frist_name,
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        second_name: [
          this.FormSingup.second_name,
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        frist_surname: [
          this.FormSingup.frist_surname,
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
        second_surname: [
          this.FormSingup.second_surname,
          [
            Validators.required,
            Validators.minLength(2)
          ]
        ],
      }
    )
    this.FormSingup2 = this.fb.group(
      {
        username: [
          this.FormSingup.username,
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ],
        password: [
          this.FormSingup.password,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern("^[a-zA-Z0-9.@_-]+$"),
            // matchMinus,
            // matchMayus,
            // matchNum,
            // matchEspec,
            // matchFormat,
            // matchSpace
          ]
        ],
        confirpassword: [
          this.FormSingup.confirpassword,
          [
            Validators.required,
            matchesPass
          ]
        ],
        email: [
          this.FormSingup.email,
          [
            Validators.required,
            Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
          ]
        ],
      }
    )
  }

  get f1() { return (this.FormSingup1.controls as any); }
  get f2() { return (this.FormSingup2.controls as any); }

  ngOnInit(): void {

  }
  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  onCheckPass() {
    this.show = true;
    let pass = this.FormSingup2.value.password;

    // Si el campo es seleccionado
    let touch = this.f2.password.touched;

    let required = false;
    let format = false;
    let minlenght = false;
    let maxlenght = false;
    let minus = false;
    let mayus = false;
    let num = false;
    let espec = false;
    let space = false;

    // Requerido
    pass != '' ? required = true : required = false;
    // Formato
    !pass.match(/[^A-z0-9$!@#$%&*()_\-.\^]/) ? format = true : format = false;
    // Longitud minima
    (pass.length >= 6) ? minlenght = true : minlenght = false;
    // Longitud maxima
    (pass.length <= 20) ? maxlenght = true : maxlenght = false;
    // Minuscucla
    pass.match(/[a-z]/) ? minus = true : minus = false;
    // Mayuscula
    pass.match(/[A-Z]/) ? mayus = true : mayus = false;
    // Numero
    pass.match(/\d/) ? num = true : num = false;
    // Espacios
    pass.match(/\s/) ? space = false : space = true;
    // Caracter Especial
    pass.match(/\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\-|\./) ? espec = true : espec = false;

    const json = {
      Vtouch: touch,
      Vformat: { valid: format, msg: 'Formato erróneo' },
      Vrequired: { valid: required, msg: 'Debe introducir su contraseña.' },
      Vminlenght: { valid: minlenght, msg: 'Debe contener al menos 6 caracteres.' },
      Vmaxlenght: { valid: maxlenght, msg: 'Debe contener máximo 20 caracteres.' },
      Vminus: { valid: minus, msg: 'Debe contener al menos una minúscula.' },
      Vmayus: { valid: mayus, msg: 'Debe contener al menos una mayúscula.' },
      Vnum: { valid: num, msg: 'Debe contener al menos un número.' },
      Vespec: { valid: espec, msg: 'Debe contener al menos un carácter especial.' },
      Vspace: { valid: space, msg: 'El campo no permite espacios.' }
    };

    return json;
  }


  resolved(captchaResponse: string) {
    this.tokencaptcha = captchaResponse;
  }
  submit(stepper: MatStepper) {
    if (this.FormSingup1.valid && this.FormSingup2.valid) {
      this.service.Singup(this.FormSingup1.value, this.FormSingup2.value).pipe(takeUntil(this._unsubscribe)).subscribe(data => {
        this.CheckRegister = true;
        this.toast.success(data.message);
        setTimeout(() => {
          stepper.next();
        }, 1000);
      })
    }
  }

}
