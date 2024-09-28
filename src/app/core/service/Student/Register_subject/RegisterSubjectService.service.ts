import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class RegisterSubjectService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseURLStudent;
  }

  register_subject(code: string): Observable<any> {
    return this.http.get<any>(this.url + "subject/sinc_code/" + code);
  }

}