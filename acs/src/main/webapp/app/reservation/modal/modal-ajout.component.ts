import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";
import { ReservationService } from "src/main/webapp/app/reservation/reservation.service";
import { DatePipe } from "@angular/common";
import { ReservationArticle } from "src/main/webapp/app/shared/reservation/reservationArticle.entity";
import { ArticleDispo } from "src/main/webapp/app/shared/reservation/articleDispo.entity";
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/main/webapp/app/auth/token-storage.service';
import { formatDate } from "@angular/common";
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { Moment } from "moment";

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
    valid=true;
    dateFailed=false;
    saveFailed=false;
    modif=false;
    articleId : number;
    message : string;
    article: ReservationArticle = new ReservationArticle();
    user:string;
    indexModif:number;
    listErreur: string[];
    
    dateEmprunt: string;
    dateRestitution: string;
    
    dateLimiteAsso :Moment;
    
    listeArticlesDispo: ArticleDispo[];
    listeResaArticleAjoutes : ReservationArticle[]=[];
    
    
    constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ModalAjoutComponent>,private reservationService:ReservationService,
            @Inject(MAT_DIALOG_DATA) public data, private adapter: DateAdapter<any>,
            public alertConfig: NgbAlertConfig, public datepipe: DatePipe, private token : TokenStorageService, ) {
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
    ngOnInit() {
        //changement langue pour affichage chiffre datepicker
        this.adapter.setLocale('fr');
        this.dateLimiteAsso=moment().add(3, 'months');
        if(this.data.reservation){
            this.reservationAdd = this.data.reservation;
            this.dateEmprunt = moment(this.reservationAdd.dateEmprunt).format('DD/MM/YYYY');
        
            if(this.data.reservation.id){          
                this.dateRestitution = moment(this.reservationAdd.dateRestitution).format('DD/MM/YYYY');
                this.modif=true;
                this.titre = "Modification d'une réservation";
                this.labelBouton = "Modifier";
                this.dateChanged();
            }else{
                this.titre = "Ajout d'une réservation";
                this.labelBouton = "Ajouter";
                this.reservationAdd.asso=false;
                this.modif=false;
                this.ajoutArticle();
            }
        
        }else{
            this.reservationAdd = new Reservation();
            this.titre = "Ajout d'une réservation";
            this.labelBouton = "Ajouter";
            this.modif=false;
        }

        this.user=this.token.getUsername();
    }
    
    // Changement de date, recherche des articles dispos
    dateChanged(){
        

        if( this.reservationAdd.dateEmprunt && this.reservationAdd.dateRestitution){
            if(this.listeArticlesDispo!=null){
                console.log("vidage de la liste des articles");
                this.reservationAdd.articleResaDto.splice(0, this.reservationAdd.articleResaDto.length);
                this.ajoutArticle();
            }
            const dateDFormat = (this.datepipe.transform(this.reservationAdd.dateEmprunt, 'dd/MM/yyyy'));
            const dateFFormat = (this.datepipe.transform(this.reservationAdd.dateRestitution, 'dd/MM/yyyy'));
            if(this.reservationAdd.dateEmprunt>this.reservationAdd.dateRestitution){
                this.dateFailed=true;
                this.message = "Veuillez choisir une date de retour supérieure à la date d'emprunt";
            }else{
                this.dateFailed=false;
                if(moment(this.reservationAdd.dateEmprunt)>this.dateLimiteAsso && this.reservationAdd.asso){
                    console.log("asso et 3 mois");
                    this.reservationService.getArticlesDispo( dateDFormat, dateFFormat,true).subscribe(data =>{
                        const typeDispoInter: string[] =[];
                        data.forEach(function (articleDispo) {
                            if(!typeDispoInter.includes(articleDispo.type)){
                                typeDispoInter.push(articleDispo.type);
                            }
                        }); 
                       this.typeDispo = typeDispoInter;
                       this.listeArticlesDispo = data;
                    });
                }else{
                    //cas normal
                    console.log("cas normal");
                    this.reservationService.getArticlesDispo( dateDFormat, dateFFormat,false).subscribe(data =>{
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
    }
    
    ajoutArticle(){
        let newArticle = new ReservationArticle();
        newArticle.newArticle=true;
        this.reservationAdd.articleResaDto.push(Object.assign({},newArticle));
        
    }
    
    getReservationUpdate($event){
        this.reservationAdd = $event;
    }
    
    save(){
        
        if(!this.dateFailed){
            for(let i =0; i<this.reservationAdd.articleResaDto.length; i++){
                if(!this.reservationAdd.articleResaDto[i].quantite || this.reservationAdd.articleResaDto[i].quantite===0){
                    this.reservationAdd.articleResaDto.splice(i,1);
                }
            }
        
            if(this.reservationAdd.articleResaDto.length===0){
                this.saveFailed=true;
                this.message = "Veuillez ajouter au moins un article à la réservation";
            }else{
                this.saveFailed=false;
                this.reservationAdd.creerPar=this.user;
                this.reservationAdd.avalider=true;
                this.reservationService.validerArticles(this.reservationAdd,false).subscribe(
                        data=>{
                                console.log("premiere validation")
                                this.valid=data;
                                if(this.valid && !this.reservationAdd.asso){
                                    this.reservationService.saveReservation(this.reservationAdd).subscribe(
                                            data=>{
                                                console.log("seconde validation cas normal");
                                                this.dialogRef.close();
                                                window.location.reload();
                                            },
                                            error => {
                                                this.message="Erreur d'enregistrement de la réservation";
                                                this.saveFailed=true;
                                            }
                                        );
                                }else if (this.valid && !this.reservationAdd.asso){
                                    this.reservationService.validerArticles(this.reservationAdd,false).subscribe(
                                            data=>{
                                                console.log("seconde validation cas asso et 3 mois");
                                                this.valid=data;
                                                if(this.valid){
                                                    this.reservationService.validerArticlesAsso3Mois(this.reservationAdd).subscribe(
                                                            data=>{
                                                                this.listErreur=data;
                                                                const dialogRef = this.dialog.open(ModalAjoutComponent, {
                                                                    width: '650px',
                                                                    data: {liste: this.listErreur, reservation : this.reservationAdd}
                                                                });
                                                            }
                                                    );
                                                }
                                            },
                                            error =>{
                                                this.valid=false;
                                                this.message="Erreur de validation de la réservation";
                                            }
                                    );
                                }else{
                                    this.valid=false;
                                    this.message="Les quantités désirées ne sont plus disponibles, veuillez recharger la page";
                                }
                                
                            },
                        error=>{
                            console.log(error);
                            this.message="Erreur de validation de la réservation";
                            this.valid=false;
                        });
                    
            }
        }else{
            console.log("Date incorrecte");
        }
    }

    supprimerArticle(){
        this.reservationAdd.articleResaDto.splice(this.indexModif,1);
    }
    supprimerReservation(){
        this.reservationService.supprimerReservation(this.reservationAdd).subscribe(
                data=>{
                    this.dialogRef.close();
                    window.location.reload();
                },
                error => {
                    console.log(error);
                    this.message="Erreur de suppression de la réservation";
                }
            );
    }
   
}