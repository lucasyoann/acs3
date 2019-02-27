import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


import {TokenStorageService} from 'src/main/webapp/app/auth/token-storage.service';

@Injectable({ providedIn: 'root' })
export class RouteGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenStorage: TokenStorageService,
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Promise<boolean> {
        console.log( 'canActivate' );
        return this.checkLogin( state );

    }

    checkLogin( state: RouterStateSnapshot ): Promise<boolean> {
        console.log( 'checkLogin' );
        if ( this.tokenStorage.getToken() ) {
            return Promise.resolve( true );
        } else {
            console.log( 'not athenticated' );
            this.router.navigate( ['/dashboard'], {
                queryParams: { origin: state.url }
            } );
            return  Promise.resolve( false );
        }
    }
}