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
    selector: 'app-checkdispo',
    templateUrl: './checkdispo.component.html'
} )
export class CheckDispoComponent implements OnInit {
 
    dateDebutText : Date;
    dateFinText : Date;
    searchFailed : boolean = false;
    message:string;
    listArticlesDispo : ArticleDispo[];
    displayedColumns: string[] = ['type', 'description', 'quantite'];
    
    constructor(public dialog: MatDialog, private reservationService:ReservationService, public datepipe: DatePipe,
            private adapter: DateAdapter<any>, private token : TokenStorageService,private userService: UserService){}
       
    ngOnInit() { 
        this.adapter.setLocale('fr');
        this.searchFailed=false;
    }
    
    rechercherDisponibilite(){
        if( this.dateDebutText && this.dateFinText){
            if(this.dateDebutText>this.dateFinText){
                this.searchFailed=true
                this.message="Veuillez choisir une date de fin supérieure à la date de début de la réservation"
            }else{
                const dateDFormat = (this.datepipe.transform(this.dateDebutText, 'dd/MM/yyyy'));
                const dateFFormat = (this.datepipe.transform(this.dateFinText, 'dd/MM/yyyy'));
                this.reservationService.getArticlesDispo( dateDFormat, dateFFormat).subscribe(
                        data =>{
                            this.listArticlesDispo=data;
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
        console.log("TRI EN COURS");
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
