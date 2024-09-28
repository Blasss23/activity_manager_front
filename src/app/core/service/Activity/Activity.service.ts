import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable()
export class ActivityService {
  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.baseURLStudent;
  }
  Activities_list() {
    return this.http.get<any>(this.url + "subject/activity/list");
  }
  Detail_activity(id: string | null) {
    return this.http.get<any>(this.url + "subject/activity/detail/" + id);
  }
  Deleted_activity(id: string | null) {
    return this.http.get<any>(this.url + "subject/activity_send/delete/" + id);
  }
  Send_activity(fomulario: any): Observable<any> {
    let InForm: any = fomulario;
    let formData = new FormData();
    formData.append('files', InForm.file);
    formData.append('data', '{"description":"' + fomulario.description + '","fk_code_subject": "' + fomulario.fk_code_subject + '","fk_activity":"' + fomulario.fk_id_activity + '"}');
    return this.http.post(this.url + 'subject/activity/send', formData, { headers: new HttpHeaders(), observe: 'response' });
  }
}
