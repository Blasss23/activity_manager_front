import { Component, ChangeDetectorRef, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoadingService } from 'src/app/core/service/common/loading.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit, DoCheck, AfterViewInit {

  public jwt: string | null = localStorage.getItem('token')
  public type_user: string = 'student';
  public user: any | null = localStorage.getItem('user');
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher, public loadingService: LoadingService, private router: Router, private toast: ToastrService) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    let userv: any = localStorage.getItem('user');
    this.jwt = localStorage.getItem('token');
    this.user = JSON.parse(userv); 
  }
  ngAfterViewInit() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('type_user') == "student") {
        localStorage.setItem('type_user', this.type_user);
      } else {
        this.router.navigate([localStorage.getItem('type_user') + '/Dashboard']);
      }
    }
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/student/auth/login']);
    this.toast.success("you have logout, come back soon!")
  }

}
