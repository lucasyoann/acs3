import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Event } from '../shared/reservation/event';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";
import { DatePipe } from '@angular/common'

@Injectable()
export class ReservationService {
    constructor(private httpClient: HttpClient, public datepipe: DatePipe) {}
       
    getReservation(dateDebut, dateFin): Observable<Reservation[]> {
        let params = new HttpParams();
        params = params.append('debut', dateDebut);
        params = params.append('fin', dateFin);
        return this.httpClient.get( `acs/reservations/`, { params: params }) as Observable<Reservation[]>;
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
}