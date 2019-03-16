import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";
import { ReservationService } from "src/main/webapp/app/reservation/reservation.service";
import { DatePipe } from "@angular/common";
import { ArticleDispo } from "src/main/webapp/app/shared/reservation/articleDispo.entity";
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/main/webapp/app/auth/token-storage.service';

@Component( {
    selector: 'ref-modal-ajout',
    templateUrl: './modal-ajout.component.html',
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
                NgbAlertConfig
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
    typeChoisit: string[];
    saveFailed=false;
    dateFailed=false;
    articleId : number;
    message : string;
    article: ArticleDispo = new ArticleDispo();
    user:string;
    
    listeArticlesDispo: ArticleDispo[];
    
    
    constructor(public dialogRef: MatDialogRef<ModalAjoutComponent>,private reservationService:ReservationService,
            @Inject(MAT_DIALOG_DATA) public data, private adapter: DateAdapter<any>,
            public alertConfig: NgbAlertConfig, public datepipe: DatePipe, private token : TokenStorageService, ) {
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
    ngOnInit() {
        //changement langue pour affichage chiffre datepicker
        this.adapter.setLocale('fr');
        
        if(this.data.reservation){
            this.reservationAdd = this.data.reservation
            
        }else{
            this.reservationAdd = new Reservation();
            this.reservationAdd.articleDispo.push(this.article);
        }
        if(this.reservationAdd.id != null){
            this.titre = "Modification d'une réservation";
            this.labelBouton = "Modifier";
        }else{
            this.titre = "Ajout d'une réservation";
            this.labelBouton = "Ajouter";
        }
        this.user=this.token.getUsername();
    }
    
    // Changement de date, recherche des articles dispos
    dateChanged(){

        if( this.reservationAdd.dateEmprunt && this.reservationAdd.dateRestitution){
            const dateDFormat = (this.datepipe.transform(this.reservationAdd.dateEmprunt, 'dd/MM/yyyy'));
            const dateFFormat = (this.datepipe.transform(this.reservationAdd.dateRestitution, 'dd/MM/yyyy'));
            console.log("Date de début",dateDFormat);
            console.log("Date de fin",dateFFormat);
            if(dateDFormat>dateFFormat){
                console.log("essai");
                this.dateFailed=true;
                this.message = "Veuillez choisir une date de retour supérieure à la date d'emprunt";
            }else{
                this.dateFailed=false;
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
    }
    
    ajoutArticle(){
        this.reservationAdd.articleDispo.push(new ArticleDispo());
    }
    
    getReservationUpdate($event){
        this.reservationAdd = $event;
    }
    
    save(){
        
        if(!this.dateFailed){
            console.log("Reservation",this.reservationAdd);
            for(let i =0; i<this.reservationAdd.articleDispo.length; i++){
                if(!this.reservationAdd.articleDispo[i].quantiteMax){
                    this.reservationAdd.articleDispo.splice(i,1);
                }
            }
        
            if(this.reservationAdd.articleDispo.length===0){
                this.saveFailed=true;
                this.message = "Veuillez ajouter au moins un article à la réservation";
                console.log("Réservation sans article");
            }else{
                this.saveFailed=false;
                console.log("Réservation en cours...");
            }
        }else{
            console.log("Date incorrecte");
        }
    }
   
}