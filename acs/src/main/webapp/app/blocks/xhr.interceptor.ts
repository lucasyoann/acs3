import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable( { providedIn: 'root'})
export class XhrInterceptor implements HttpInterceptor {

    constructor( ) { }

    intercept( req: HttpRequest<any>, next: HttpHandler ) {
       const  xhr = req.clone( {headers: req.headers.set( 'X-Requested-With', 'XMLHttpRequest' )});
           return next.handle(xhr);
    }
}
