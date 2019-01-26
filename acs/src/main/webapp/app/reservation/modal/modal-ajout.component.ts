import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";
import { ReservationService } from "src/main/webapp/app/reservation/reservation.service";
import { DatePipe } from "@angular/common";
import { ArticleDispo } from "src/main/webapp/app/shared/reservation/articleDispo.entity";

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
    
    typeDispo: string[];
    typeChoisit: string;
    
    listeArticlesDispo: ArticleDispo[];
    
    listeArticleSelect: ArticleDispo[];
    
    constructor(public dialogRef: MatDialogRef<ModalAjoutComponent>,private reservationService:ReservationService,
            @Inject(MAT_DIALOG_DATA) public data, private adapter: DateAdapter<any>, public datepipe: DatePipe ) {
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
    
    // Changement de date, recherche des articles dispos
    dateChanged(){

        if( this.reservationAdd.dateEmprunt && this.reservationAdd.dateRestitution){
            const dateDFormat = (this.datepipe.transform(this.reservationAdd.dateEmprunt, 'dd/MM/yyyy'));
            const dateFFormat = (this.datepipe.transform(this.reservationAdd.dateRestitution, 'dd/MM/yyyy'));
            this.reservationService.getArticlesDispo( dateDFormat, dateFFormat).subscribe(data =>{
                const typeDispoInter: string[] =[];
                data.forEach(function (articleDispo) {
                    if(!typeDispoInter.includes(articleDispo.type)){
                        typeDispoInter.push(articleDispo.type);
                    }
                }); 
               this.typeDispo = typeDispoInter;
               this.listeArticlesDispo = data;
            });
        }
    }
    
    // Changement Type d'article -> filtrage et création liste des articles dispo 
    changementArticle(){
        const typeChoisit = this.typeChoisit;
        const listeArticle: ArticleDispo[] = [];
        this.listeArticlesDispo.forEach(function (articleDispo) {
            if(articleDispo.type == typeChoisit){
                listeArticle.push(articleDispo);
            }
        });
        this.listeArticleSelect = listeArticle;
    }
}