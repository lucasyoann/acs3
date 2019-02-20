import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';

import {AuthService} from 'src/main/webapp/app/auth/auth.service';
import {TokenStorageService} from 'src/main/webapp/app/auth/token-storage.service';
import {AuthLoginInfo} from 'src/main/webapp/App/auth/login-info';

@Component( {
    selector: 'ref-modal-connexion',
    templateUrl: './modal-connexion.component.html',
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
              ],
} )
export class ModalConnexion implements OnInit {
    
    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    private loginInfo: AuthLoginInfo;
    
    constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
    
    ngOnInit() {
        if (this.tokenStorage.getToken()) {
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
        }
      }
    
    onSubmit() {
        console.log("connexion");
        this.loginInfo = new AuthLoginInfo(
          this.form.username,
          this.form.password);
        this.authService.attemptAuth(this.loginInfo).subscribe(
          data => {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUsername(data.username);
            this.tokenStorage.saveAuthorities(data.authorities);
     
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getAuthorities();
            this.reloadPage();
          },
          error => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.isLoginFailed = true;
          }
        );
      }
     
      reloadPage() {
        window.location.reload();
      }
    
}