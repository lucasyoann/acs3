import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";

@Component( {
    selector: 'ref-modal-ajout',
    templateUrl: './modal-ajout.component.html',
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
              ],
} )
export class ModalAjoutComponent implements OnInit {
    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString());
    
    dateDebut: Date = new Date();
    
    titre:string;
    labelBouton:string;
    
    reservationAdd: Reservation;
    
    constructor(public dialogRef: MatDialogRef<ModalAjoutComponent>,
            @Inject(MAT_DIALOG_DATA) public data, private adapter: DateAdapter<any> ) {
    }
    
    ngOnInit() {
        //changement langue pour affichage chiffre datepicker
        this.adapter.setLocale('fr');
        if(this.data.reservation){
            this.reservationAdd = this.data.reservation
            
        }else{
            this.reservationAdd = new Reservation(); 
        }
        if(this.reservationAdd.id != null){
            this.titre = "Modification d'une réservation";
            this.labelBouton = "Modifier";
        }else{
            this.titre = "Ajout d'une réservation";
            this.labelBouton = "Ajouter";
        }
        
        
    }
}