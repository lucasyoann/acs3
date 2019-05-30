import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {StockService} from '../stock.service';
import {Article} from '../../shared/article/article.entity';


import { MatDialog } from '@angular/material';
import { ViewEncapsulation } from "@angular/core";

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'ref-modal-modif-article',
    template: `<div class="row" style="justify-content: space-between">
<h2 mat-dialog-title class="color-bleu row">{{titre}}</h2>
</div>

<ngb-alert *ngIf="saveFailed">
        {{message}}
  </ngb-alert>
<form (ngSubmit)="save()" ngNativeValidate>
    <mat-dialog-content style="width:100%">
        <div class="row">
            <div class="form-group" style="width:100%"> 
                <mat-form-field *ngIf="modif" style="width:100%">
                    <input matInput readonly placeholder="Type de mat&eacute;riel" id="type" name="type" [(ngModel)] = "article.type">
                </mat-form-field>
                <mat-form-field *ngIf="!modif" style="width:100%">
                    <input matInput required placeholder="Type de mat&eacute;riel" id="type" name="type" [(ngModel)] = "article.type">
                </mat-form-field>
                <mat-form-field *ngIf="modif" style="width:100%">
                    <input matInput readonly placeholder="Intitul&eacute;" id="intitule" name="intitule" [(ngModel)] = "article.intitule">
                </mat-form-field>
                <mat-form-field *ngIf="!modif" style="width:100%">
                    <input matInput required placeholder="Intitul&eacute;" id="intitule" name="intitule" [(ngModel)] = "article.intitule">
                </mat-form-field>
                <mat-form-field style="width:100%">
                    <input matInput required placeholder="Quantit&eacute;" id="quantite" name="quantite" [(ngModel)] = "article.quantite">
                </mat-form-field>
                <hr/>
                <div style="width:100%">
                    <h5>Description</h5>
                    <mat-form-field style="width:100%">
                        <textarea matInput style="min-width: 100%" [(ngModel)] = "article.description" [ngModelOptions]="{standalone: true}"></textarea>
                    </mat-form-field>
                </div>
            </div>
        </div>  
    </mat-dialog-content>
    <mat-dialog-actions>
        <button type="button" class="btn btn-link" (click)="dialogRef.close()">Annuler</button>
        <button type="submit" class="btn btn-success">{{labelBouton}}</button>
    </mat-dialog-actions>
</form>`,
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