import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/core/service/common/loading.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit, DoCheck {

  public jwt: string | null = localStorage.getItem('token')
  public type_user: string = 'teacher';
  public user: any | null = localStorage.getItem('user');
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  mobileQuery: MediaQueryList ;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,  public loadingService: LoadingService,private router: Router,  private toast:ToastrService) {
 
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('type_user') == "teacher") {
        localStorage.setItem('type_user', this.type_user);
      }else{
        this.router.navigate([localStorage.getItem('type_user') + '/Dashboard']);
      }
    }
    
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnInit(): void {
  }

  ngDoCheck() {
    let userv:any = localStorage.getItem('user');
    this.jwt = localStorage.getItem('token');
    this.user = JSON.parse(userv);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/teacher/auth/login']);
    this.toast.success("you have logout, come back soon!")
  }

}
