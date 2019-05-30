import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


import {TokenStorageService} from './token-storage.service';
import {AuthService} from './auth.service';

@Injectable({ providedIn: 'root' })
export class RouteGuard implements CanActivate {
    
    result: boolean;

    constructor(
        private router: Router,
        private tokenStorage: TokenStorageService,
        private authService: AuthService,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
        console.log( 'canActivate' );
         //let test = this.checkLogin( state );
        console.log( 'checkLogin' );
        return new Observable<boolean>( (observer) => {  
            if(this.tokenStorage.getToken()){
                let tets = null;
                this.authService.validateToken(this.tokenStorage.getToken()).subscribe(data =>{
                     if(!data){
                         
                         this.tokenStorage.signOut();
                         this.router.navigate( ['/dashboard'], {
                             queryParams: { origin: state.url }
                         } );
                         this.result = false;
                         observer.next( false );
                     }else{
                         this.result = true;
                         observer.next( true );
                     }
                              
                 });

             } else {
                 console.log( 'not athenticated' );
                 this.router.navigate( ['/dashboard'], {
                     queryParams: { origin: state.url }
                 } );
                 observer.next( false );
         }

    });
    }

    /*checkLogin( state: RouterStateSnapshot ): Promise<boolean> {
        console.log( 'checkLogin' );
        if(this.tokenStorage.getToken()){
           let tets = null;
           this.authService.validateToken(this.tokenStorage.getToken()).map(data =>{
                if(!data){
                    this.tokenStorage.signOut();
                    this.result = false;
                }else{
                    this.result = true;
                }
            }, err => this.tokenStorage.signOut(),
            () => {if(this.result) return Promise.resolve( true );
            });
           
           
           //while(tets != true){};
           console.log(this.result);
            //return result.then();
        } else {
            console.log( 'not athenticated' );
            this.router.navigate( ['/dashboard'], {
                queryParams: { origin: state.url }
            } );
            return  Promise.resolve( false );
        }
       // return Promise.resolve( true );
    }*/
}