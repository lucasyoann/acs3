import { Input, Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

import {AuthService} from 'src/main/webapp/app/auth/auth.service';
import {TokenStorageService} from 'src/main/webapp/app/auth/token-storage.service';
import {AuthLoginInfo} from 'src/main/webapp/App/auth/login-info';

interface Alert {
    type: string;
    message: string;
  }

const ALERT: Alert = {
    type: 'success',
    message: 'This is an success alert',
  };
  
  
@Component( {
    selector: 'ref-modal-connexion',
    templateUrl: './modal-connexion.component.html',
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
                NgbAlertConfig
              ],
} )


export class ModalConnexion implements OnInit {
    
    form: any = {};
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    private loginInfo: AuthLoginInfo;
    alert: Alert;
    
    constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
            alertConfig: NgbAlertConfig, public dialogRef: MatDialogRef<ModalConnexion> ) {
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
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
            this.form.password="";
          }
        );
      }
     
      reloadPage() {
        window.location.reload();
      }
    
}