import { Input, Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

import {AuthService} from '../../../../auth/auth.service';
import {TokenStorageService} from '../../../../auth/token-storage.service';
import {AuthLoginInfo} from '../../../../auth/login-info';

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
    template:`<div class="row" style="justify-content: space-between;height: 40px;">
<h2 mat-dialog-title class="color-vert-stg row">Connexion </h2>
</div>
<div *ngIf="isLoginFailed">
    <ngb-alert>
        Erreur d'autentification
  </ngb-alert>
</div>
<mat-dialog-content>
    <div class="row">
        <div class="form-group column" >
            <div class="row">
                <mat-form-field>
                    <input matInput placeholder="Identifiant de connexion" id="nomconnexion" name="nomconnexion" [(ngModel)] = "form.username">
                </mat-form-field>
            </div>
            <div class="row">
                <mat-form-field>
                    <input matInput placeholder="Mot de passe" type="password" id="motdepasse" name="motdepasse" [(ngModel)] = "form.password">
                </mat-form-field>
            </div>
        </div>

    </div>
</mat-dialog-content>
<mat-dialog-actions>
    <button class="btn btn-link"(click)="dialogRef.close()">Annuler</button>
    <button class="btn btn-success"(click)="onSubmit()">Connexion</button>
</mat-dialog-actions>`,
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