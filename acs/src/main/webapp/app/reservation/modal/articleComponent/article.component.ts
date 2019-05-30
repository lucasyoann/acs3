import { Component, OnInit, Inject,Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";
import { ArticleDispo } from "src/main/webapp/app/shared/reservation/articleDispo.entity";
import { ReservationArticle } from "src/main/webapp/app/shared/reservation/reservationArticle.entity";

//import { ModalAjoutComponent } from "src/main/webapp/app/reservation/modal/modal-ajout.component";

@Component( {
    selector: 'ref-article',
    templateUrl: './article.component.html',
    providers: [],
} )
export class ArticleComponent implements OnInit {
    
    @Input() listeArticlesDispo: ArticleDispo[];
    @Input() typeDispo: string[];
    @Input() reservationAdd : Reservation;
    @Input() indexAjout : number;
    @Output() reservationUpdated = new EventEmitter<Reservation>();
    
    
    quantiteMax : string;
    quantiteChoisie : string;
    quantmaxchargee : boolean;
    typeArticleChargee : boolean;
    etatQ:number=0;
    

    listeArticleSelect: ArticleDispo[];

    article: ArticleDispo = new ArticleDispo();

    ngOnInit() {
        if(this.reservationAdd.articleResaDto[this.indexAjout].articleId){
            this.article.description = this.reservationAdd.articleResaDto[this.indexAjout].nom;
            this.article.type = this.reservationAdd.articleResaDto[this.indexAjout].type;
            this.article.id = this.reservationAdd.articleResaDto[this.indexAjout].articleId;
            this.article.quantiteMax = this.reservationAdd.articleResaDto[this.indexAjout].quantite;
            this.changementArticle();
            this.getQuantiteMax();
        }
        
    }
// Changement Type d'article -> filtrage et création liste des articles dispo 
    changementArticle(){
        const typeChoisit = this.article.type;
        const listeArticle: ArticleDispo[] = [];
        this.listeArticlesDispo.forEach(function (articleDispo) {
            if(articleDispo.type == typeChoisit){
                listeArticle.push(articleDispo);
            }
        });
        this.listeArticleSelect = listeArticle;
        this.typeArticleChargee=true;
        this.quantiteMax='';
        this.quantiteChoisie='';
        if(this.quantmaxchargee==true){
            this.quantmaxchargee=false;
        }
    }
    
    getQuantiteMax(){
        const articlechoisit = this.article.id;
        var quantMax;
        this.reservationAdd.articleResaDto[this.indexAjout].articleId= articlechoisit;
        this.listeArticleSelect.forEach(function (articleDispo){
            if(articleDispo.id==articlechoisit){
                quantMax = articleDispo.quantiteMax;
                
            }
        });
        this.quantiteMax=quantMax;
        if(parseInt(this.quantiteMax)<0){
                this.quantiteMax="0";
        }        
        this.quantmaxchargee=true;
        
    }
                
    saveEtat(){
                this.getQuantiteMax();
                if(!this.article.quantiteMax){
                    this.etatQ =0;
                }else{
                
                    this.etatQ = this.article.quantiteMax;
                }
    }
    
    saveQuantite(){
       
        const quantite =this.article.quantiteMax;
        
        if(quantite>parseInt(this.quantiteMax+this.etatQ)){

            this.article.quantiteMax=parseInt(this.quantiteMax)+this.etatQ;
            this.reservationAdd.articleResaDto[this.indexAjout].quantite=parseInt(this.quantiteMax)+this.etatQ;
        }else if(!quantite || quantite<0){
            this.article.quantiteMax=0;
            this.reservationAdd.articleResaDto[this.indexAjout].quantite=0;
        }else{
            this.reservationAdd.articleResaDto[this.indexAjout].quantite=quantite;
        }
        this.listeArticlesDispo.forEach(function (articleDispo) {
                if( this.reservationAdd.articleResaDto[this.indexAjout].articleId===articleDispo.id){
                    
                    articleDispo.quantiteMax = articleDispo.quantiteMax -this.reservationAdd.articleResaDto[this.indexAjout].quantite + this.etatQ;
                    this.quantiteMax = articleDispo.quantiteMax;
                }
        }.bind(this)); 
        
        
    }
    
    supprimerArticle(){
        this.listeArticlesDispo.forEach(function (articleDispo) {
            if(this.reservationAdd.articleResaDto[this.indexAjout].quantite && this.reservationAdd.articleResaDto[this.indexAjout].articleId===articleDispo.id){
               
                articleDispo.quantiteMax = articleDispo.quantiteMax +this.reservationAdd.articleResaDto[this.indexAjout].quantite;
                this.quantiteMax = articleDispo.quantiteMax;
                
            }
        }.bind(this)); 
        
        this.reservationAdd.articleResaDto.splice(this.indexAjout,1);
        this.reservationUpdated.emit(this.reservationAdd);
    }
}  