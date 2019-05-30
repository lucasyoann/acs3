import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";
import { ReservationService } from "src/main/webapp/app/reservation/reservation.service";
import { DatePipe } from "@angular/common";
import { ReservationArticle } from "src/main/webapp/app/shared/reservation/reservationArticle.entity";
import { ArticleDispo } from "src/main/webapp/app/shared/reservation/articleDispo.entity";
import { TokenStorageService } from 'src/main/webapp/app/auth/token-storage.service';
import * as moment from 'moment';

@Component( {
    selector: 'ref-modal-consultation-reservation',
    templateUrl: './modal-consultation-reservation.html',
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
              ],
} )
export class ModalConsultationReservationComponent implements OnInit {
    
    reservationAdd: Reservation;
    dateEmprunt: string;
    dateRestitution: string;
    
    constructor(public dialogRef: MatDialogRef<ModalConsultationReservationComponent>,private reservationService:ReservationService,
            @Inject(MAT_DIALOG_DATA) public data, private adapter: DateAdapter<any>,
            public datepipe: DatePipe, private token : TokenStorageService, ) {}
    
    ngOnInit() {
        //changement langue pour affichage chiffre datepicker
        this.adapter.setLocale('fr');
        this.reservationAdd = this.data.reservation;
        this.dateEmprunt = moment(this.reservationAdd.dateEmprunt).format('DD/MM/YYYY');
        this.dateRestitution = moment(this.reservationAdd.dateRestitution).format('DD/MM/YYYY');
    }
    
}