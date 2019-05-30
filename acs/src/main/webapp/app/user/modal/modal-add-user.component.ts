import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './../user.service';

import { MatDialog } from '@angular/material';
import { UserFonctionnel } from '../../shared/user/userFonctionnel.entity';
import { User } from '../../shared/user/user.entity';
import { ViewEncapsulation } from "@angular/core";


@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'ref-modal-add-user',
    template: `<div class="row" style="justify-content: space-between">
<h2 mat-dialog-title class="color-bleu row">Ajout d'un utilisateur </h2>
</div>

<ngb-alert *ngIf="saveFailed">
        {{message}}
  </ngb-alert>
<form (ngSubmit)="save()" ngNativeValidate>
    <mat-dialog-content style="width:100%">
        <div class="row">
            <div class="form-group" style="width:100%"> 
                <mat-form-field style="width:100%">
                    <input matInput required placeholder="Identifiant" id="username" name="username" [(ngModel)] = "userAdd.username">
                </mat-form-field>
            </div>
        </div>
        <div class="row">
            <div class="form-group" style="width:100%"> 
                <mat-form-field style="width:100%">
                    <input matInput required placeholder="Mot de passe" type="password" id="password" name="password" [(ngModel)] = "userAdd.password">
                </mat-form-field>
            </div>
        </div>
        <div class="row">
            <div class="form-group" style="width:100%"> 
                <mat-form-field style="width:100%">
                    <input matInput required placeholder="Confirmation du mot de passe" type="password" id="passwordConfirm" name="passwordConfirm" [(ngModel)] = "userAdd.passwordConfirm">
                </mat-form-field>
            </div>
        </div>
        <div class="row">
            <div class="form-group"> 
                <mat-checkbox color="warn" style="float:right;" name="administrateur" [(ngModel)] = "userAdd.administrateur">Administrateur</mat-checkbox>
            </div>
        </div>  
    </mat-dialog-content>
    <mat-dialog-actions>
        <button type="button" class="btn btn-link" (click)="dialogRef.close()">Annuler</button>
        <button type="submit" class="btn btn-success">Cr&eacute;er</button>
    </mat-dialog-actions>
</form>`,
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
                NgbAlertConfig
              ],
} )

export class ModalAddUserComponent implements OnInit {
    
    userWellFormed : User = new User();
    userAdd : UserFonctionnel = new UserFonctionnel();
    saveFailed : boolean;
    message : string;
    
    constructor(public dialogRef: MatDialogRef<ModalAddUserComponent>,
            @Inject(MAT_DIALOG_DATA) public data, private userService:UserService, private adapter: DateAdapter<any>,
            public alertConfig: NgbAlertConfig ) {
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
    ngOnInit() {
        
    }
    
    save(){
        this.saveFailed=false;
        if(this.userAdd.password === this.userAdd.passwordConfirm){
            if(this.userAdd.password.length>=8){
    
                if(this.userAdd.administrateur){
                    this.userWellFormed.role = new Array("ROLE_ADMIN","ROLE_USER");
                }else{
                    this.userWellFormed.role = new Array("ROLE_USER");
                }
                this.userWellFormed.password=this.userAdd.password;
                this.userWellFormed.username = this.userAdd.username;
                this.userWellFormed.email = this.userAdd.username.concat("@acs.Com");
                this.userService.addUser(this.userWellFormed).subscribe(
                        data=>{
                            this.dialogRef.close();
                            window.location.reload();
                        },
                        error=>{
                            this.message="Erreur de création de l'utilisateur";
                            this.saveFailed=true;
                        }
                );
            }else{
                this.message="Au moins 8 caractères sont requis dans votre mot de passe";
                this.saveFailed=true;
            }
        }else{
            this.message="Le mot de passe doit être égal au mot de passe de confirmation";
            this.saveFailed=true;
        }
            
    }
    
}