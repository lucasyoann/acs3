import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import { Reservation } from "../../shared/reservation/reservation.entity";
import { ReservationService } from "../../reservation/reservation.service";
import { DatePipe } from "@angular/common";
import { ReservationArticle } from "src/main/webapp/app/shared/reservation/reservationArticle.entity";
import { ReservationModifiee } from "../../shared/reservation/reservationModifiee.entity";
import { ArticleDispo } from "src/main/webapp/app/shared/reservation/articleDispo.entity";
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/main/webapp/app/auth/token-storage.service';
import {ModalListErreurComponent} from './modal/modalListeErreur.component';
import { formatDate } from "@angular/common";
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { Moment } from "moment";

@Component( {
    selector: 'ref-modal-ajout',
    template: `<div class="row" style="justify-content: space-between">
<h2 mat-dialog-title class="color-bleu row">{{titre}} </h2>
<mat-checkbox color="warn" style="float:right;" [(ngModel)] = "reservationAdd.asso">Association</mat-checkbox>
</div>

<ngb-alert *ngIf="!valid || saveFailed || dateFailed">
        {{message}}
  </ngb-alert>
<form (ngSubmit)="save()" ngNativeValidate>
    <mat-dialog-content>
        <div class="row">
            <div class="form-group" *ngIf="reservationAdd.asso"> 
                <mat-form-field>
                    <input matInput placeholder="Raison sociale" id="rs" name="rs" [(ngModel)] = "reservationAdd.nom">
                </mat-form-field>
            </div>
            <div class="form-group row" *ngIf="!reservationAdd.asso">
                <div class="column">
                    <mat-form-field>
                        <input matInput placeholder="Nom" id="nom" required name="nom" [(ngModel)] = "reservationAdd.nom">
                    </mat-form-field>
                </div>
                <div class="column">
                    <mat-form-field>
                        <input matInput placeholder="Pr&eacute;nom" id="prenom" name="prenom" [(ngModel)] = "reservationAdd.prenom">
                    </mat-form-field>
                </div>
            </div>
        </div>
        <div class="row" *ngIf="!modif">
            <mat-form-field>
                <input matInput [matDatepicker]="dateDebut" required placeholder="Date de d&eacute;but" name="dateEmprunt" [(ngModel)] = "reservationAdd.dateEmprunt" (dateChange)="dateChanged()">
                <mat-datepicker-toggle matSuffix [for]="dateDebut"></mat-datepicker-toggle>
                <mat-datepicker #dateDebut></mat-datepicker>
            </mat-form-field>
            <mat-form-field>
                <input matInput [matDatepicker]="dateFin" required placeholder="Date de fin"  name="dateRestitution" [(ngModel)] = "reservationAdd.dateRestitution" (dateChange)="dateChanged()">
                <mat-datepicker-toggle matSuffix [for]="dateFin"></mat-datepicker-toggle>
                <mat-datepicker #dateFin [startAt]="reservationAdd.dateEmprunt"></mat-datepicker>
            </mat-form-field>
        </div>
        <div class="row" *ngIf="modif">
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
        <div *ngIf="(typeDispo && typeDispo.length != 0)">
            <hr/>
            <h5>S&eacute;lection du mat&eacute;riel</h5>
            <div *ngFor="let articlechoisi of reservationAdd.articleResaDto; index as i">
                <ref-article  
                    [listeArticlesDispo]="listeArticlesDispo"
                    [typeDispo]="typeDispo" [reservationAdd]="reservationAdd" [indexAjout]="i"
                    (reservationUpdated) = "getReservationUpdate($event)">  
                </ref-article>
            </div>  
            <div class = "row" style="align-items:flex-start; justify-content:space-between" >
                <div class="column">
                    <button type="button" class="btn btn-success" (click)="ajoutArticle()">Ajout article</button>
                </div>
            </div>
        </div>
        <hr/>
        <div style="width:100%">
            <h5>Commentaires</h5>
            <mat-form-field style="width:100%">
                <textarea matInput style="min-width: 100%" [(ngModel)] = "reservationAdd.commentaire" [ngModelOptions]="{standalone: true}"></textarea>
            </mat-form-field>
        </div>
    </mat-dialog-content>
    <mat-dialog-actions>
        <button type="button" class="btn btn-link" (click)="dialogRef.close()">Annuler</button>
        <button type="button" *ngIf="modif" class="btn btn-success" (click)="supprimerReservation()">Supprimer</button>
        <button type="submit" class="btn btn-success">{{labelBouton}}</button>
    </mat-dialog-actions>
</form>`,
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
    listResaModifiees: ReservationModifiee[];
    
    dateEmprunt: string;
    dateRestitution: string;
    
    dateLimiteAsso :Moment;
    
    listeArticlesDispo: ArticleDispo[];
    listeResaArticleAjoutes : ReservationArticle[]=[];
    
    
<<<<<<< HEAD
    constructor(public dialogRef: MatDialogRef<ModalAjoutComponent>,private reservationService:ReservationService,
            @Inject(MAT_DIALOG_DATA) public data : any, private adapter: DateAdapter<any>,
=======
    constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ModalAjoutComponent>,private reservationService:ReservationService,
            @Inject(MAT_DIALOG_DATA) public data, private adapter: DateAdapter<any>,
>>>>>>> b851bda23c24d2fd4f09dcf6d4115a4f5c770e2c
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
            this.reservationAdd.asso=false;
        }

        this.user=this.token.getUsername();
    }
    
    // Changement de date, recherche des articles dispos
    dateChanged(){
        

        if( this.reservationAdd.dateEmprunt && this.reservationAdd.dateRestitution){
            if(this.listeArticlesDispo!=null){
                
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
    
    getReservationUpdate($event : Reservation){
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
                                
                                this.valid=data;
                                if(this.valid){
                                    this.reservationService.saveReservation(this.reservationAdd).subscribe(
                                            data=>{
                                                this.dialogRef.close();
                                            },
                                            error => {
                                                this.message="Erreur d'enregistrement de la réservation";
                                                this.saveFailed=true;
                                            }
                                        );
                                }else if (!this.valid && this.reservationAdd.asso){
                                    this.reservationService.validerArticles(this.reservationAdd,true).subscribe(
                                            data=>{
                                                this.valid=data;
                                                if(this.valid){
                                                    this.reservationService.validerArticlesAsso3Mois(this.reservationAdd).subscribe(
                                                            data=>{
                                                                this.listResaModifiees=data;

                                                                for(let j =0; j<this.listResaModifiees.length; j++){
                                                                    this.reservationService.saveReservation(this.listResaModifiees[j].reservationDto).subscribe(
                                                                        data=>{
                                                                                if(j===this.listResaModifiees.length-1){
                                                                                    this.reservationService.saveReservation(this.reservationAdd).subscribe(
                                                                                            data =>{
                                                                                                this.dialogRef.close();
                                                                                                const dialogRef = this.dialog.open(ModalListErreurComponent, {
                                                                                                    width: '650px',
                                                                                                    data: {liste: this.listResaModifiees, reservation : this.reservationAdd}
                                                                                                });
                                                                                            },
                                                                                            error=>{
                                                                                                this.message="Erreur de modification des réservations";
                                                                                                this.saveFailed=true;
                                                                                            });
                                                                                }
                                                                                
                                                                            
                                                                        },
                                                                        error=>{
                                                                            this.message="Erreur de modification des réservations";
                                                                            this.saveFailed=true;
                                                                        });
                                                                
                                                                }
                                                            
                                                                
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
                            this.message="Erreur de validation de la réservationEEEEEEE";
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
                },
                error => {
                    console.log(error);
                    this.message="Erreur de suppression de la réservation";
                }
            );
    }
   
}