import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {StockService} from '../stock.service';
import {Article} from '../../shared/article/article.entity';


import { MatDialog } from '@angular/material';

@Component( {
    selector: 'ref-modal-modif-article',
    templateUrl: './modal-modif-article.component.html',
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
                NgbAlertConfig
              ],
} )

export class ModalModifArticleComponent implements OnInit {
    
    message : string;
    saveFailed : boolean=false;
    article: Article=new Article();
    titre : string;
    modif: boolean =false;
    labelBouton : string;
    
    constructor(public dialogRef: MatDialogRef<StockService>,
            @Inject(MAT_DIALOG_DATA) public data, private stockService:StockService,
            public alertConfig: NgbAlertConfig ) {
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
    ngOnInit() {
        if(this.data.article){
            this.article = this.data.article;
            this.titre="Modification d'un article";
            this.labelBouton="Modifier";
            this.modif=true;
        }else{
            this.titre="Ajout d'un article";
            this.labelBouton="Ajouter";
            this.modif=false;
        }   
    }
    
    save(){
        this.stockService.modifUser(this.article).subscribe(
                data=>{
                    this.dialogRef.close();
                    window.location.reload();
                },
                error=>{
                    this.message="Erreur d'enregistrement de l'article";
                    this.saveFailed=true;
                }
        );
    }
   
    
}