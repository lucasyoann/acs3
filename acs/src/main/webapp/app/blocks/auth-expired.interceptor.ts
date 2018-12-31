import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable( { providedIn: 'root'})
export class AuthExpiredInterceptor implements HttpInterceptor {

    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {},
            )
        );
    }
}
