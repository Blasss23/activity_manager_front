import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class StudentRouterGuard implements CanActivate {
    constructor(private router: Router, public toast:ToastrService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('type_user')) {
                if (localStorage.getItem('type_user') == "student") {
                    return true;
                } else {
                    this.router.navigate([localStorage.getItem('type_user') + '/Dashboard']);
                    return false;
                }
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('type_user');
                this.router.navigate(['main']); 
                return false;
            }
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('type_user');
            this.toast.error("Squeezed session")
            this.router.navigate(['student/auth/login']); 
            return false;
        }
    }
}