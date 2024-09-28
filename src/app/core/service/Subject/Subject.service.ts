import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { detail_subject } from '../../model/detail_subject.model';
@Injectable()
export class SubjectService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseURLStudent;
  }
  Subjects_list() {
    return this.http.get<any>(this.url + "subject/list");
  }
  Detail_subject(id: string | null) {
    return this.http.get<detail_subject>(this.url + "subject/detail/" + id);
  }
}
