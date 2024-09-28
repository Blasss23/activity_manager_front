import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { detail_subject } from 'src/app/core/model/detail_subject.model';
import { SubjectService } from 'src/app/core/service/Subject/Subject.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-subjects',
  templateUrl: './detail-subjects.component.html',
  styleUrls: ['./detail-subjects.component.scss']
})
export class DetailSubjectsComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();
  public id: string | null = '';
  public dataSubject: detail_subject = new detail_subject;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  displayedColumns2: string[] = ['id_activity', 'name_activity', 'Date_create', 'boolsendstatus', 'Date_delivery', 'Status', 'description', "weighint", 'act'];
  dataSource2: MatTableDataSource<any> = new MatTableDataSource;

  constructor(public SubjectService: SubjectService, private route: ActivatedRoute, private location: Location) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  ngOnInit(): void {
    this.Detail_subject()

  }
  Detail_subject() {
    this.SubjectService.Detail_subject(this.id).pipe(takeUntil(this._unsubscribe)).subscribe((data: detail_subject) => {
      this.dataSubject = data;
      this.dataSource2 = new MatTableDataSource(data.activity_adj);
      this.dataSource2.paginator = this.paginator;
    }, err => {
      this.location.back()
    })
  }

  compare_date(date: any) {
    let date1: Date = new Date();
    let date2: Date = new Date(date.Date_delivery);
    return (date1.getTime() >= date2.getTime());
  }
  compare_date2(date: any) {
    let date1: Date = new Date();
    let date2: Date = new Date(date.Date_delivery);
    return (date1.getTime() >= date2.getTime());
  }

  description_substr(description: string) {
    if (description.length >= 30) {
      return description.substr(0, 30) + "...";
    } else {
      return description;
    }
  }

}
