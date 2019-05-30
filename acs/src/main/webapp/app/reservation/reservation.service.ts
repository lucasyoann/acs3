import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Event } from '../shared/reservation/event';
import { Reservation } from "../shared/reservation/reservation.entity";
import { DatePipe } from '@angular/common'
import { ArticleDispo } from "src/main/webapp/app/shared/reservation/articleDispo.entity";
import { ReservationArticle } from "src/main/webapp/app/shared/reservation/reservationArticle.entity";
import { ReservationValidation } from "../shared/reservation/reservationValidation.entity";
import { ReservationModifiee } from "../shared/reservation/reservationModifiee.entity";

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
    
    reservationValidation : ReservationValidation=new ReservationValidation();
    
    constructor(private httpClient: HttpClient, public datepipe: DatePipe) {}
       
    getReservation(dateDebut : any, dateFin : any): Observable<Reservation[]> {
        let params = new HttpParams();
        params = params.append('debut', dateDebut);
        params = params.append('fin', dateFin);
        return this.httpClient.get( this.reservationUrl, { params: params }) as Observable<Reservation[]>;
    }
    
    transformedReservationToSchedulerEvent(reservations : any): Promise<Event[]>{
        let eventList :Event[]= [];

        
        reservations.forEach(function(resa : any) {
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
    getArticlesDispo(dateDebut : any, dateFin : any, asso : any): Observable<ArticleDispo[]> {
        let params = new HttpParams();
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
        
        this.reservationValidation.reservationDto=reservation;
        this.reservationValidation.asso=asso;
        return this.httpClient.post( this.validReservationUrl, this.reservationValidation, httpOptions) as Observable<boolean>;
    }
    
    validerArticlesAsso3Mois(reservation: Reservation){
        return this.httpClient.post( this.validResaAsso, reservation, httpOptions) as Observable<ReservationModifiee[]>;
    }
    
    getReservationById(id : any): Observable<Reservation> {
        let params = new HttpParams();
        params = params.append('id', id);
        return this.httpClient.get( this.getReservationByIdUrl,  { params: params }) as Observable<Reservation>;
    }
    
    supprimerReservation(reservation: Reservation){
        return this.httpClient.post( this.deleteReservation, reservation, httpOptions) as Observable<boolean>;
    }
}