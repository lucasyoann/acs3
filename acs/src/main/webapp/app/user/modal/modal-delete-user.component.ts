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
    selector: 'ref-modal-delete-user',
    template: `<div class="row" style="justify-content: space-between">
<h2 mat-dialog-title class="color-bleu row">Suppression d'un utilisateur</h2>
</div>

<ngb-alert *ngIf="saveFailed">
        {{message}}
</ngb-alert>
  
<mat-dialog-content>
    <p>&Ecirc;tes vous s&ucirc;r de vouloir supprimer l'utilisateur {{userAdd.username}}?</p>
</mat-dialog-content>
<mat-dialog-actions>
    <button type="button" class="btn btn-link" (click)="dialogRef.close()">Annuler</button>
    <button type="button" class="btn btn-success" (click)="deleteUserA()">Supprimer</button>
</mat-dialog-actions>` ,
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
                NgbAlertConfig
              ],
} )

export class ModalDeleteUserComponent implements OnInit {
    
    userAdd : UserFonctionnel = new UserFonctionnel();
    message : string;
    saveFailed : boolean;
    
    constructor(public dialogRef: MatDialogRef<ModalDeleteUserComponent>,
            @Inject(MAT_DIALOG_DATA) public data, private userService:UserService, private adapter: DateAdapter<any>,
            public alertConfig: NgbAlertConfig ) {
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
    ngOnInit() {
        this.userAdd = this.data.user;
    }
    
    deleteUserA(){
        this.userService.deleteUserA(this.userAdd).subscribe(
                data=>{
                    this.dialogRef.close();
                    window.location.reload();
                },
                error=>{
                    this.message="Erreur d'enregistrement de l'utilisateur";
                    this.saveFailed=true;
                }
              );;
    }
}