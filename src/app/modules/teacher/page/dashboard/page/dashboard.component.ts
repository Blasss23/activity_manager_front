import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardServiceT } from 'src/app/core/service/Teacher/Dashboard/Dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  displayedColumns1: string[] = ['code_subjects', 'name_subjects', 'bool_deleted', 'turn', 'section_subjects', 'act'];

  dataSource1: MatTableDataSource<any> = new MatTableDataSource;

  @ViewChild('paginator1', { read: MatPaginator }) paginator1: MatPaginator | any;
  private _unsubscribe = new Subject<void>();
  constructor(public DashboardService: DashboardServiceT) {
    this.dataSource1 = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.get_list_subjets()
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
