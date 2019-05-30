import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatListModule } from '@angular/material';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
import { ReservationModifiee } from "../../../shared/reservation/reservationModifiee.entity";
import { ViewEncapsulation } from "@angular/core";
@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'modal-list-erreur',
    template:`<div class="row" style="justify-content: space-between">
<h2 mat-dialog-title class="color-bleu row">R&eacute;servations modifi&eacute;es</h2>
</div>
<mat-list *ngFor="let ligne of listResaModifiee">
    <mat-list-item>{{ligne.messageErreur}}</mat-list-item>
    <mat-divider></mat-divider>
</mat-list>
<mat-dialog-actions>
    <button type="button" class="btn btn-link" (click)="fermer()">Fermer</button>
</mat-dialog-actions>`,
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
                NgbAlertConfig
              ],
} )

export class ModalListErreurComponent implements OnInit {
    
    saveFailed: boolean =false;
    message: string;
    listResaModifiee : ReservationModifiee[]=[];
    
    constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ModalListErreurComponent>,
            @Inject(MAT_DIALOG_DATA) public data, private adapter: DateAdapter<any>,
            public alertConfig: NgbAlertConfig ) {
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
    ngOnInit() {
        if(this.data.liste){
            this.listResaModifiee=this.data.liste;
        }else{
            this.saveFailed=true;
            this.message = "Erreur de récupération des réservations modifiées";
        }
    }
    
    fermer(){
        this.dialogRef.close();
    }
}