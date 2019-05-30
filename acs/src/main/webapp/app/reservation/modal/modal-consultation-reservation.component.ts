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
import { ViewEncapsulation } from "@angular/core";

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'ref-modal-consultation-reservation',
    template: `<div class="row" style="justify-content: space-between">
<h2 mat-dialog-title class="color-bleu row">Informations R&eacute;servation</h2>
<mat-checkbox disabled="disabled" color="warn" style="float:right;" [(ngModel)] = "reservationAdd.asso">Association</mat-checkbox>
</div>

<mat-dialog-content>
    <div class="row">
            <div class="form-group" *ngIf="reservationAdd.asso"> 
                <mat-form-field>
                    <input matInput readonly placeholder="Raison sociale" id="rs" name="rs" [(ngModel)] = "reservationAdd.nom">
                </mat-form-field>
            </div>
            <div class="form-group row" *ngIf="!reservationAdd.asso">
                <div class="column">
                    <mat-form-field>
                        <input matInput readonly placeholder="Nom" id="nom" required name="nom" [(ngModel)] = "reservationAdd.nom">
                    </mat-form-field>
                </div>
                <div class="column" *ngIf="reservationAdd.prenom!=null">
                    <mat-form-field>
                        <input matInput readonly placeholder="Pr&eacute;nom" id="prenom" name="prenom" [(ngModel)] = "reservationAdd.prenom">
                    </mat-form-field>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <mat-form-field>
                    <input matInput readonly placeholder="Date de d&eacute;but" name="dateEmprunt" [(ngModel)] = "dateEmprunt">
                </mat-form-field>
            </div>
            <div class="column">
                <mat-form-field>
                    <input matInput readonly placeholder="Date de fin" name="dateRestitution" [(ngModel)] = "dateRestitution">
                </mat-form-field>
            </div>
        </div>
        <div>
            <hr/>
            <h5>S&eacute;lection du mat&eacute;riel</h5>
            <div class ="row" *ngFor="let articlechoisi of reservationAdd.articleResaDto; index as i">
                <mat-form-field>
                    <input matInput readonly placeholder="Type" [(ngModel)] = "articlechoisi.type">
                </mat-form-field>
                <mat-form-field>
                    <input matInput readonly placeholder="Nom" [(ngModel)] = "articlechoisi.nom">
                </mat-form-field>
                <mat-form-field>
                    <input matInput readonly placeholder="Quantite" [(ngModel)] = "articlechoisi.quantite">
                </mat-form-field>
            </div>  
        </div>
        <hr/>
        <div style="width:100%">
            <h5>Commentaires</h5>
            <mat-form-field style="width:100%">
                <textarea matInput readonly style="min-width: 100%" [(ngModel)] = "reservationAdd.commentaire" [ngModelOptions]="{standalone: true}"></textarea>
            </mat-form-field>
        </div>
</mat-dialog-content>
<mat-dialog-actions>
    <button type="button" class="btn btn-link" (click)="dialogRef.close()">Fermer</button>
</mat-dialog-actions>`,
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