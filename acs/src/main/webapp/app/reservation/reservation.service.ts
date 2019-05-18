import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Event } from '../shared/reservation/event';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";
import { DatePipe } from '@angular/common'
import { ArticleDispo } from "src/main/webapp/app/shared/reservation/articleDispo.entity";
import { ReservationArticle } from "src/main/webapp/app/shared/reservation/reservationArticle.entity";

const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

@Injectable()
export class ReservationService {
    
    private reservationUrl = 'acs/reservations/';
    private validReservationUrl = 'acs/articles/validate';
    private getReservationByIdUrl = 'acs/reservations/id';
    private deleteReservation = 'acs/reservations/delete';
    private validResaAsso = 'acs/articles/validateAsso';
    
    constructor(private httpClient: HttpClient, public datepipe: DatePipe) {}
       
    getReservation(dateDebut, dateFin): Observable<Reservation[]> {
        let params = new HttpParams();
        params = params.append('debut', dateDebut);
        params = params.append('fin', dateFin);
        return this.httpClient.get( this.reservationUrl, { params: params }) as Observable<Reservation[]>;
    }
    
    transformedReservationToSchedulerEvent(reservations): Promise<Event[]>{
        let eventList :Event[]= [];

        
        reservations.forEach(function(resa) {
            let evt = new Event();
            evt.id = resa.id;
            evt.start_date = this.datepipe.transform( resa.dateEmprunt, 'MM-dd-yyyy HH:mm').toString();
            evt.end_date = this.datepipe.transform( resa.dateRestitution, 'MM-dd-yyyy HH:mm').toString();
            evt.text= resa.nom;
            if(resa.prenom != null){
                evt.text+=" "+resa.prenom;
            }
           
            eventList.push(evt);
        }.bind(this));        
        return Promise.resolve(eventList);
    }
    
    
    /** appel permettant de récupérer la liste des articles disponibles entre 2 dates et leur nombre */
    getArticlesDispo(dateDebut, dateFin, asso): Observable<ArticleDispo[]> {
        let params = new HttpParams();
        console.log("essai "+ asso);
        params = params.append('debut', dateDebut);
        params = params.append('fin', dateFin);
        params = params.append('asso',asso);
        return this.httpClient.get( `acs/articles/articledispo`, { params: params }) as Observable<ArticleDispo[]>;
    }
    
    saveReservation(reservation: Reservation){
        return this.httpClient.post<string>(this.reservationUrl, reservation, httpOptions);
    }
    
    //méthode de validation de la réservation (accès concurrent)
    
    validerArticles(reservation: Reservation,asso:boolean){
        console.log("esaisdjfndslfnsdfsdfsfsdfdsfs");
        console.log(reservation);
        return this.httpClient.post( this.validReservationUrl, {reservation,asso}, httpOptions) as Observable<boolean>;
    }
    
    validerArticlesAsso3Mois(reservation: Reservation){
        return this.httpClient.post( this.validResaAsso, reservation, httpOptions) as Observable<string[]>;
    }
    
    getReservationById(id): Observable<Reservation> {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.httpClient.get( this.getReservationByIdUrl,  { params: params }) as Observable<Reservation>;
    }
    
    supprimerReservation(reservation: Reservation){
        return this.httpClient.post( this.deleteReservation, reservation, httpOptions) as Observable<boolean>;
    }
}