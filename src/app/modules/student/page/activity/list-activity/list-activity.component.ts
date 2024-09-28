import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivityService } from 'src/app/core/service/Activity/Activity.service';

@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.scss']
})
export class ListActivityComponent implements OnInit {
  displayedColumns2: string[] = ['id_activity','name_activity', 'description', 'Date_create', 'boolsendstatus', 'Date_delivery', 'weighint', 'status', "fkCodeSubjectCodeSubjects",   'act'];
  dataSource2: MatTableDataSource<any> = new MatTableDataSource; 
 
  @ViewChild(MatPaginator) paginator: MatPaginator | any ; 

  private _unsubscribe = new Subject<void>();
  constructor(public ActivityService: ActivityService) {

    this.dataSource2 = new MatTableDataSource(); 
  }

  ngOnInit(): void {
    this.list_ativity()
    this.dataSource2.paginator = this.paginator; 
   
  }
  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  list_ativity() {
    this.ActivityService.Activities_list().pipe(takeUntil(this._unsubscribe)).subscribe(data => { 
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

  description_substr(description: string) {
    if (description.length >= 30) {
      return description.substr(0, 30) + "...";
    } else {
      return description;
    }
  }
  
}
