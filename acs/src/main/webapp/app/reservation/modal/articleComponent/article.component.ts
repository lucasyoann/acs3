import { Component, OnInit, Inject,Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";
import { ArticleDispo } from "src/main/webapp/app/shared/reservation/articleDispo.entity";
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
        this.quantmaxchargee=false;
        this.typeArticleChargee=false;
        console.log("index debut" +this.index);
        console.log(this.reservationAdd.articleDispo);
        
    }
// Changement Type d'article -> filtrage et création liste des articles dispo 
    changementArticle(){
        const typeChoisit = this.article.type;
        this.reservationAdd.articleDispo[this.index].type= typeChoisit;
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
        this.reservationAdd.articleDispo[this.index].id= articlechoisit;
        this.listeArticleSelect.forEach(function (articleDispo){
            if(articleDispo.id==articlechoisit){
                quantMax = articleDispo.quantiteMax;
                
            }
        });
        this.quantiteMax=quantMax;
        this.quantmaxchargee=true;
        
    }
    
    saveQuantite(){
       
        const quantite =this.article.quantiteMax;
        console.log("quantite saisie",quantite);
        console.log("quantite max", this.quantiteMax);
        if(quantite>parseInt(this.quantiteMax)){
            console.log("essai");
            this.article.quantiteMax=parseInt(this.quantiteMax);
            this.reservationAdd.articleDispo[this.index].quantiteMax=parseInt(this.quantiteMax);
        }else if(quantite<0){
            console.log("essai12");
            this.article.quantiteMax=0;
            this.reservationAdd.articleDispo[this.index].quantiteMax=0;
        }else{
            console.log("essai1");
            this.reservationAdd.articleDispo[this.index].quantiteMax=quantite;
        }
        
        
    }
    
    supprimerArticle(){
        
        this.reservationAdd.articleDispo.splice(this.index,1);
        this.reservationUpdated.emit(this.reservationAdd);
    }
}  