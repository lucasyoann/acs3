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
    @Input() index : number;
    @Output() reservationUpdated = new EventEmitter<Reservation>();
    //@Input() article: ArticleDispo;
    
    
    quantiteMax : string;
    quantiteChoisie : string;
    quantmaxchargee : boolean;
    typeArticleChargee : boolean;
    

    listeArticleSelect: ArticleDispo[];

    article: ArticleDispo = new ArticleDispo();

    ngOnInit() {
        console.log("index debut" +this.index);
        console.log(this.reservationAdd.articleResaDto);
        
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
        this.reservationAdd.articleResaDto[this.index].articleId= articlechoisit;
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
    
    saveQuantite(){
       
        const quantite =this.article.quantiteMax;
        console.log("quantite saisie",quantite);
        console.log("quantite max", this.quantiteMax);
        if(quantite>parseInt(this.quantiteMax)){
            console.log("essai");
            this.article.quantiteMax=parseInt(this.quantiteMax);
            this.reservationAdd.articleResaDto[this.index].quantite=parseInt(this.quantiteMax);
        }else if(quantite<0){
            console.log("essai12");
            this.article.quantiteMax=0;
            this.reservationAdd.articleResaDto[this.index].quantite=0;
        }else{
            console.log("essai1");
            this.reservationAdd.articleResaDto[this.index].quantite=quantite;
        }
        
        
    }
    
    supprimerArticle(){
        
        this.reservationAdd.articleResaDto.splice(this.index,1);
        this.reservationUpdated.emit(this.reservationAdd);
    }
}  