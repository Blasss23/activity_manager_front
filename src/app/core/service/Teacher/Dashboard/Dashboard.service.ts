import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable()
export class DashboardServiceT {
    public url: string;

    constructor(private http: HttpClient) {
        this.url = environment.baseURLTeacher;
    }

    // Dashboard_Macro() {
    //     return this.http.get<any>(this.url + "dashboard/macro/");
    // }
    List_Subjects() {
        return this.http.get<any>(this.url + "subject/list");
    }

}