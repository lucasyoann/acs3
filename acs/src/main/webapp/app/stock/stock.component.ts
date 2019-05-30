import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, SimpleChanges } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ReservationService } from '../reservation/reservation.service';
import { MatDialog } from '@angular/material';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {StockService} from './stock.service';
import {Article} from '../shared/article/article.entity';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Sort} from '@angular/material';
import {ModalModifArticleComponent} from './modal/modal-modif-article.component';


@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'app-stock',
    template: `<ngb-alert *ngIf="saveFailed">
        {{message}}
  </ngb-alert>
<div style="background-color:white;border-radius:5px;margin:15px 0;">
    <div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center;">
        <h2 mat-dialog-title class="color-bleu" style="margin:10px 20px;padding-top:10px">Gestion des stocks</h2>
        <button type="button" style="margin-right:10px" class="btn btn-success" (click)="modifierArticle(element)">Cr&eacute;er un Article</button>
    </div>
    
    <table mat-table *ngIf="listArticle && listArticle.length>0" [dataSource]="listArticle" matSort (matSortChange)="sortData($event)" style="width:100%; border-top:1px solid rgba(0, 0, 0, 0.1)">

    <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->
    <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef mat-sort-header="type"> Type </th>
        <td mat-cell *matCellDef="let element"> {{element.type}} </td>
    </ng-container>
    <ng-container matColumnDef="intitule">
        <th mat-header-cell *matHeaderCellDef mat-sort-header="intitule"> Initul&eacute; </th>
        <td mat-cell *matCellDef="let element"> {{element.intitule}} </td>
    </ng-container>
    <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef mat-sort-header="description"> Description </th>
        <td mat-cell *matCellDef="let element"> {{element.description}} </td>
    </ng-container>
    <ng-container matColumnDef="quantite">
        <th mat-header-cell *matHeaderCellDef mat-sort-header="quantite"> Quantit&eacute; </th>
        <td mat-cell *matCellDef="let element"> {{element.quantite}} </td>
    </ng-container>
    <ng-container matColumnDef="modifier">
        <th mat-header-cell *matHeaderCellDef> Modifier </th>
        <td mat-cell *matCellDef="let element"> <button type="button" class="btn btn-success" (click)="modifierArticle(element)">Modifier</button> </td>
    </ng-container>


    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
</div>`
} )
export class StockComponent implements OnInit {
    
    saveFailed : boolean =false;
    superAdministrateur : boolean = false;
    message:string;
    listArticle : Article[];
    displayedColumns: string[] = ['type','intitule','description', 'quantite', 'modifier'];
    
    constructor(public dialog: MatDialog, private reservationService:ReservationService,
             private token : TokenStorageService,private stockService: StockService, private router: Router){}
    
    
    
    ngOnInit() { 
        this.token.getAuthorities().forEach(function(role : string){
            if(role==="ROLE_SUPER_ADMIN"){
                this.superAdministrateur=true;
            }
        }.bind(this));
        if(this.superAdministrateur){
            this.stockService.getUsers().subscribe(
                    data=>{
                        this.listArticle=data;
                    },
                    error=>{
                        this.saveFailed=true;
                        this.message="Erreur de récupération du stock";
                    }
            )
        }else{
            this.router.navigate( ['/dashboard']);
        }
    }
    
    sortData(sort: Sort) {
        const data = this.listArticle.slice();
        if (!sort.active || sort.direction === '') {
          this.listArticle = data;
          return;
        }

        this.listArticle= data.sort((a, b) => {
          const isAsc = sort.direction === 'asc';
          switch (sort.active) {
            case 'type': return compare(a.type, b.type, isAsc);
            case 'intitule': return compare(a.intitule, b.intitule, isAsc);
            case 'description': return compare(a.description, b.description, isAsc);
            case 'quantite': return compare(a.quantite, b.quantite, isAsc);
            default: return 0;
          }
        });
      }
    
    modifierArticle(element : Article){
        const dialogRef = this.dialog.open(ModalModifArticleComponent, {
            data: {article: element}
        });
    }
    
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }