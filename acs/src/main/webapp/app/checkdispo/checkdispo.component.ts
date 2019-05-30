import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, SimpleChanges } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ReservationService } from '../reservation/reservation.service';
import { MatDialog } from '@angular/material';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";
import { DatePipe } from '@angular/common';
import { TokenStorageService } from '../auth/token-storage.service';
import {UserService} from '../user/user.service';
import {UserFonctionnel} from '../shared/user/userFonctionnel.entity';
import { ArticleDispo } from '../shared/reservation/articleDispo.entity';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Sort} from '@angular/material';

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'app-checkdispo',
    template: `<ngb-alert *ngIf="searchFailed">
        {{message}}
  </ngb-alert>
<div style="background-color:white;border-radius:5px;margin:15px 0;">
    <h2 mat-dialog-title class="color-bleu" style="margin:10px 20px;padding-top:10px">V&eacute;rification des disponibilit&eacute;s</h2>
    <div class="row" style="justify-content:flex-start; align-items:center">
        <mat-form-field style="margin-right:20px; margin-left:20px;">
            <input matInput [matDatepicker]="dateDebut" required placeholder="Date de d&eacute;but" [(ngModel)] = "dateDebutText">
            <mat-datepicker-toggle matSuffix [for]="dateDebut"></mat-datepicker-toggle>
                <mat-datepicker #dateDebut></mat-datepicker>
        </mat-form-field>
        <mat-form-field style="margin-left:20px; margin-right:20px;">
            <input matInput [matDatepicker]="dateFin" required placeholder="Date de fin" [(ngModel)] = "dateFinText">
            <mat-datepicker-toggle matSuffix [for]="dateFin"></mat-datepicker-toggle>
                <mat-datepicker #dateFin [startAt]="dateDebutText">></mat-datepicker>
        </mat-form-field>
        <mat-checkbox style="margin-left:20px; margin-right:20px;" color="warn" [(ngModel)] = "asso">Association</mat-checkbox>
        <mat-dialog-actions style="margin-left:20px; margin-right:20px;">
            <button type="button" class="btn btn-success" (click)="rechercherDisponibilite()">Rechercher</button>
        </mat-dialog-actions>
    </div>
    <table  *ngIf="listArticlesDispo && listArticlesDispo.length>0" mat-table [dataSource]="listArticlesDispo" matSort (matSortChange)="sortData($event)" style="width:100%; border-top:1px solid rgba(0, 0, 0, 0.1)">

    <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->
    <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef mat-sort-header="type"> Type </th>
        <td mat-cell *matCellDef="let element"> {{element.type}} </td>
    </ng-container>
    <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef mat-sort-header="description"> Description </th>
        <td mat-cell *matCellDef="let element"> {{element.description}} </td>
    </ng-container>
    <ng-container matColumnDef="quantite">
        <th mat-header-cell *matHeaderCellDef mat-sort-header="quantite"> Quantit&eacute; disponible </th>
        <td mat-cell *matCellDef="let element"> {{element.quantiteMax}} </td>
    </ng-container>


    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
</div>`
} )
export class CheckDispoComponent implements OnInit {
 
    dateDebutText : Date;
    dateFinText : Date;
    searchFailed : boolean = false;
    message:string;
    listArticlesDispo : ArticleDispo[];
    displayedColumns: string[] = ['type', 'description', 'quantite'];
    asso :boolean = false;
    
    constructor(public dialog: MatDialog, private reservationService:ReservationService, public datepipe: DatePipe,
            private adapter: DateAdapter<any>, private token : TokenStorageService,private userService: UserService){}
       
    ngOnInit() { 
        this.adapter.setLocale('fr');
        this.searchFailed=false;
    }
    
    rechercherDisponibilite(){
        if( this.dateDebutText && this.dateFinText){
            if(this.dateDebutText>this.dateFinText){
                this.searchFailed=true;
                this.message="Veuillez choisir une date de fin supérieure à la date de début de la réservation";
            }else{
                this.searchFailed=false;
                const dateDFormat = (this.datepipe.transform(this.dateDebutText, 'dd/MM/yyyy'));
                const dateFFormat = (this.datepipe.transform(this.dateFinText, 'dd/MM/yyyy'));
                this.reservationService.getArticlesDispo( dateDFormat, dateFFormat,this.asso).subscribe(
                        data =>{
                            this.listArticlesDispo=data;
                            this.searchFailed=false;
                        },
                        error =>{
                            this.searchFailed=true;
                            this.message = "Erreur de récupération des articles disponibles pour cette période";
                        }

                    ); 
                   
            }
            
        }else{
            this.searchFailed=true
            this.message="Veuillez rentrer une date de début et une date de fin de réservation"
        }   
    }
    
    sortData(sort: Sort) {
        
        const data = this.listArticlesDispo.slice();
        if (!sort.active || sort.direction === '') {
          this.listArticlesDispo = data;
          return;
        }

        this.listArticlesDispo = data.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'type': return compare(a.type, b.type, isAsc);
            case 'description': return compare(a.description, b.description, isAsc);
            case 'quantite': return compare(a.quantiteMax, b.quantiteMax, isAsc);
            default: return 0;
          }
        });
      }
    
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
