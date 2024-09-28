import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { login_model } from 'src/app/core/model/login.model';
import { singup_model } from 'src/app/core/model/singup.model';
@Injectable()
export class AuthStudentService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseURLStudent;
  }
  Login(form: login_model): Observable<any> {
    return this.http.post<any>(this.url + "auth/login", {
      username: form.user,
      password: form.password
    });
  }
  Singup(form1: any, form2: any): Observable<any> { 
    return this.http.post<any>(this.url + "auth/registeruser", {
      frist_name: form1.frist_name,
      second_name: form1.second_name,
      frist_surname: form1.frist_surname,
      second_surname: form1.second_surname,
      username: form2.username,
      password: form2.password,
      confirpassword: form2.confirpassword,
      email: form2.email
    });
  }
  Send_email_recovery(email: string) {
    return this.http.post<any>(this.url + "auth/recoverypassword", {
      email: email,
    });
  }
  Update_password(form:any, token: string | null) {
    return this.http.post<any>(this.url + "auth/changepasswordlogout/" + token, {
      newPassword: form.newPassword,
      confiPassword: form.confiPassword
    });
  }

}