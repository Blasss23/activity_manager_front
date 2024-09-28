import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubjectService } from 'src/app/core/service/Subject/Subject.service';

@Component({
  selector: 'app-list-subjects',
  templateUrl: './list-subjects.component.html',
  styleUrls: ['./list-subjects.component.scss']
})
export class ListSubjectsComponent implements OnInit {
  displayedColumns2: string[] = ['code_subjects', 'name_subjects', 'username', 'bool_deleted', 'turn', 'section_subjects', 'act'];
  dataSource2: MatTableDataSource<any> = new MatTableDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  private _unsubscribe = new Subject<void>();
  constructor(public SubjectService: SubjectService) {

    this.dataSource2 = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.list_subjects()
    this.dataSource2.paginator = this.paginator;

  }
  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  list_subjects() {
    this.SubjectService.Subjects_list().pipe(takeUntil(this._unsubscribe)).subscribe(data => {
      this.dataSource2 = new MatTableDataSource(data);
      this.dataSource2.paginator = this.paginator;
    })
  }

  compare_date(date: any) {
    let date1: Date = new Date();
    let date2: Date = new Date(date.Date_delivery);
    return (date1.getTime() >= date2.getTime()) && date.boolsendstatus == false;
  }
  compare_date2(date: any) {
    let date1: Date = new Date();
    let date2: Date = new Date(date.Date_delivery);
    return (date1.getTime() >= date2.getTime());
  }

}
