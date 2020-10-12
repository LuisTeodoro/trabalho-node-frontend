import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {

    }

    readonly token = localStorage.getItem('token');
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (localStorage.getItem('token')) {
            const authReq = req.clone({
                setHeaders:{
                    token: `${this.token}`
                }
            });
            return next.handle(authReq)
                .pipe(catchError((error) => {
                    console.log(error);
                    if(error instanceof HttpErrorResponse){
                        if (error.status == 401) {

                        }
                    }
                    return throwError(error);
                }))
        }
        return next.handle(req);
    }
}