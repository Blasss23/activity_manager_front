import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError, takeUntil, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoadingService } from '../service/common/loading.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        public toast: ToastrService,
        private loaderService: LoadingService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.isLoading.next(true);
        const token: string | null = localStorage.getItem('token');

        // Si hay token lo seteamos
        if (token) { request = request.clone({ headers: request.headers.set('Auth', token) }); }

        // Tipo de dato JSON
        if (!request.headers.has('Content-Type')) {
            //    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        // Peticiones
        return next.handle(request).pipe(
            map((event: any) => {
                try {
                    const myBody = event.body;
                    let module: string = '';
                    // Si tienes Token refrescalo
                    if (myBody.hasOwnProperty('token') && myBody.token) {
                        localStorage.setItem('token', myBody.token);
                    }
                    if (myBody.hasOwnProperty('user') && myBody.user) {
                        localStorage.setItem('user', JSON.stringify(myBody.user))
                    }
                } catch (error) { }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // Error en el Server o No autorizado o Session expirada
                if (error.status === 0 || error.status === 401) {
                    // Reiniciamos Todo
                    localStorage.removeItem('token');
                    localStorage.removeItem('type_user');
                    this.router.navigate([this.router.url.split("/")[1] + '/auth/login']);
                    if (error.error.message) {
                        this.toast.error(error.error.message + '(' + error.status + ')');
                    } else {
                        this.toast.error("Connection error");
                    } 
                }
                // Otros errores
                else {
                    if (error.error.message) {
                        this.toast.error(error.error.message + '(' + error.status + ')');
                    } else {
                        this.toast.error("Error");
                    }
                }
                // Retorna el error
                return throwError(error);
            }),
            finalize(() => {
                this.loaderService.isLoading.next(false);
            })
        );
    }
}