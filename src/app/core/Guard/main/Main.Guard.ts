import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class MainGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('type_user')) {
                this.router.navigate([localStorage.getItem('type_user') + '/Dashboard']);
                return false;
            }
            localStorage.removeItem('token');
            localStorage.removeItem('type_user');
            return false
        }
        return true;
    }
}
