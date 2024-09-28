import { ChangeDetectorRef, Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivityService } from 'src/app/core/service/Activity/Activity.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-detail-activity',
  templateUrl: './detail-activity.component.html',
  styleUrls: ['./detail-activity.component.scss']
})
export class DetailActivityComponent implements OnInit, OnDestroy, DoCheck {
  private _unsubscribe = new Subject<void>();
  public id: string | null = '';
  public dataActivity: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  public show_activity_send: boolean = false;

  displayedColumns2: string[] = ['url_server', 'description', 'weighint', 'status_verific', 'act'];
  dataSource2: MatTableDataSource<any> = new MatTableDataSource;


  @ViewChild('filePreview', { static: false }) fileInput: ElementRef;
  //variables para la subida de imagenes
  imageUrl: any;
  imageUrlFont: any = '';
  editFile: boolean = true;
  removeUpload: boolean = false;
  fileUpdate: FormGroup;
  show_image: boolean = false;
  public name_doc: string = '';
  public height: any = window.screen.height;

  constructor(
    public ActivityService: ActivityService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public toast: ToastrService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fileInput = new ElementRef('');
    this.fileUpdate = new FormGroup({
      fk_code_subject: new FormControl(null, Validators.required),
      fk_id_activity: new FormControl(null, Validators.required),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      file: new FormControl(null, Validators.required),
      fileExt: new FormControl(null),
    })
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  ngOnInit(): void {
    this.Detail_subject()

  }
  ngDoCheck() {
    this.height = window.screen.height;
  }
  get f1() { return this.fileUpdate.controls; }

  Detail_subject() {
    this.ActivityService.Detail_activity(this.id).pipe(takeUntil(this._unsubscribe)).subscribe((data) => {
      this.dataActivity = data;
      let activity = data.activity;
      activity.forEach((element: any) => {
        element["id_activity"] = this.id;
      });
      this.dataSource2 = new MatTableDataSource(data.activity);
      this.dataSource2.paginator = this.paginator;
      this.fileUpdate.patchValue({
        fk_code_subject: this.dataActivity.fkCodeSubjectCodeSubjects,
        fk_id_activity: this.dataActivity.id_activity
      })
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
  sanitize(url: string) { 
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  uploadFile(files: FileList | any) {

    let reader = new FileReader(); // HTML5 FileReader API
    let file: any = files.files.item(0);
    let extension = file.type;
    let name_doc = file.name;
    this.name_doc = name_doc;
    if ([
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/x-abiword",
      "application/x-rar-compressed",
      "application/vnd.ms-powerpoint",
      " application/vnd.ms-excel",
      "text/csv",
      "image/jpeg",
      " text/plain",
      "application/x-7z-compressed",
      "image/png",
    ].indexOf(extension) == -1 || file.size > 31457280) {
      this.toast.warning('debe subir una imagen valida')
      if (file.size > 31457280) {
        this.toast.warning('el documento debe tener un tamaño menor a 30MB')
      }

      if ([
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "application/x-abiword",
        "application/x-rar-compressed",
        "application/vnd.ms-powerpoint",
        " application/vnd.ms-excel",
        "text/csv",
        "image/jpeg",
        " text/plain",
        "application/x-7z-compressed",
        "image/png",
      ].indexOf(extension) == -1) {
        this.toast.warning('la extensión del archivo no es válida')
      }
      return false;
    }

    if (file) {
      this.fileUpdate.patchValue({
        file: file
      });
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        if (extension != 'image/png' && extension != 'image/jpeg') {
          this.imageUrlFont = '';
          this.imageUrl = reader.result;
        } else {
          this.imageUrlFont = reader.result;
          this.imageUrl = reader.result;
        }
        this.editFile = false;
        this.removeUpload = true;
      }

      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
      return true

    } else {
      return false
    }

  }
  removeUploadedFile() {
    if (!this.fileInput) {
      return
    }
    let newFileList;

    newFileList = Array.from(this.fileInput.nativeElement.files);
    this.fileInput.nativeElement.value = null;
    this.imageUrlFont = '';
    this.fileUpdate.patchValue({
      file: null,
      fileExt: null
    });
    this.name_doc = '';
    this.editFile = true;
    this.removeUpload = false;
  }

  Send_activity() {
    if (this.fileUpdate.valid) {
      this.ActivityService.Send_activity(this.fileUpdate.value).pipe(takeUntil(this._unsubscribe)).subscribe(data => {
        this.Detail_subject()
        this.fileUpdate.reset();
        this.removeUploadedFile();
        this.toast.success(data.body.message)
        this.show_image = !this.show_image;
      })
    }
  }
  back() {
    this.show_image = !this.show_image;
    this.removeUploadedFile();
    this.fileUpdate.reset()
    this.fileUpdate.patchValue({
      fk_code_subject: this.dataActivity.fkCodeSubjectCodeSubjects,
      fk_id_activity: this.dataActivity.id_activity
    })
  }
  Delete_activity_send(id: any) {
    this.ActivityService.Deleted_activity(id).pipe(takeUntil(this._unsubscribe)).subscribe(data => {
      this.Detail_subject()
      this.toast.success(data.message)
    })
  }
  openDialog(id: any) {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.Delete_activity_send(id);
      }
    });
  } 
}
