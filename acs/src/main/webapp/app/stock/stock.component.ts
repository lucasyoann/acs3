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
    selector: 'app-stock',
    templateUrl: './stock.component.html'
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
                        console.log(this.listArticle);
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
        console.log("TRI EN COURS");
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