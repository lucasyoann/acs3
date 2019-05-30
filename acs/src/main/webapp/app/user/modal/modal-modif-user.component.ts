import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './../user.service';

import { MatDialog } from '@angular/material';
import { UserFonctionnel } from '../../shared/user/userFonctionnel.entity';
import { ViewEncapsulation } from "@angular/core";

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'ref-modal-modif-user',
    template: `<div class="row" style="justify-content: space-between">
<h2 mat-dialog-title class="color-bleu row">{{titre}} </h2>
</div>

<ngb-alert *ngIf="saveFailed">
        {{message}}
  </ngb-alert>
<form (ngSubmit)="save()" ngNativeValidate>
    <mat-dialog-content>
        <div class="row">
            <div class="form-group"> 
                <mat-form-field>
                    <input matInput readonly placeholder="Identifiant" id="username" name="username" [(ngModel)] = "userAdd.username">
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
        <button type="submit" class="btn btn-success">{{labelBouton}}</button>
    </mat-dialog-actions>
</form>`,
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
                NgbAlertConfig
              ],
} )

export class ModalModifUserComponent implements OnInit {
    
    titre : string;
    message : string;
    saveFailed : boolean=false;
    userAdd : UserFonctionnel = new UserFonctionnel();
    labelBouton : string;
    creation : boolean;
    
    constructor(public dialogRef: MatDialogRef<ModalModifUserComponent>,
            @Inject(MAT_DIALOG_DATA) public data, private userService:UserService, private adapter: DateAdapter<any>,
            public alertConfig: NgbAlertConfig ) {
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
    ngOnInit() {
        if(this.data.user){
            this.creation=false;
            this.titre = "Modification d'un utilisateur";
            this.userAdd = this.data.user;
            this.labelBouton = "Modifier";
        }else{
            this.message="Erreur de récupération de l'utilisateur";
            this.saveFailed=true;
        }
            
    }
    
    save(){
        this.userAdd.roles=null;
        if(this.userAdd.administrateur){
            this.userAdd.roles = new Array("ROLE_ADMIN","ROLE_USER");
        }else{
            this.userAdd.roles = new Array("ROLE_USER");
        }
        this.userService.saveUser(this.userAdd).subscribe(
          data=>{
              this.dialogRef.close();
              window.location.reload();
          },
          error=>{
              this.message="Erreur d'enregistrement de l'utilisateur";
              this.saveFailed=true;
          }
        );
    }
    
}