import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, MatListModule } from '@angular/material';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material';
@Component( {
    selector: 'modal-list-erreur',
    templateUrl: './modalListeErreur.component.html',
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
                NgbAlertConfig
              ],
} )

export class ModalListErreurComponent implements OnInit {
    
    saveFailed: boolean =false;
    message: string;
    listErreur : string[]=[];
    
    constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ModalListErreurComponent>,
            @Inject(MAT_DIALOG_DATA) public data, private adapter: DateAdapter<any>,
            public alertConfig: NgbAlertConfig ) {
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
    ngOnInit() {
        if(this.data.liste){
            this.listErreur=this.data.listErreur;
        }else{
            this.saveFailed=true;
            this.message = "Erreur de récupération des réservations modifiées";
        }
    }
}