import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardService } from 'src/app/core/service/Student/Dashboard/Dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns1: string[] = ['code_subjects', 'name_subjects', 'username', 'bool_deleted', 'turn', 'section_subjects', 'act'];
  displayedColumns2: string[] = ['name_activity', 'description', 'Date_create', 'boolsendstatus', 'Date_delivery', 'weighint', 'Status', "fkCodeSubjectCodeSubjects", 'act'];
  private _unsubscribe = new Subject<void>();

  dataSource1: MatTableDataSource<any> = new MatTableDataSource;

  @ViewChild('paginator1', { read: MatPaginator }) paginator1: MatPaginator | any;

  dataSource2: MatTableDataSource<any> = new MatTableDataSource;

  @ViewChild('paginator2', { read: MatPaginator }) paginator2: MatPaginator | any;


  constructor(public DashboardService: DashboardService) {
    this.dataSource2 = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.get_list_subjets()
    this.get_list_dashboard()
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }


  get_list_subjets() {
    this.DashboardService.List_Subjects().pipe(takeUntil(this._unsubscribe)).subscribe(data => {
      this.dataSource1 = new MatTableDataSource(data);
      this.dataSource1.paginator = this.paginator1;
    })
  }
  get_list_dashboard() {
    this.DashboardService.Dashboard_Macro().pipe(takeUntil(this._unsubscribe)).subscribe(data => {
      this.dataSource2 = new MatTableDataSource(data);
      this.dataSource2.paginator = this.paginator2;
    })
  }
  compare_date(date: any) {
    let date1: Date = new Date();
    let date2: Date = new Date(date.Date_delivery);
    return date1.getTime() >= date2.getTime();
  }
  description_substr(description: string) {
    if (description.length >= 30) {
      return description.substr(0, 30) + "...";
    } else {
      return description;
    }
  }

}
