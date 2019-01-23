import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Event } from '../shared/reservation/event';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";

@Injectable()
export class ReservationService {
    constructor(private httpClient: HttpClient) {}
       
    getReservation(dateDebut, dateFin): Observable<Reservation[]> {
        let params = new HttpParams();
        params = params.append('debut', dateDebut);
        params = params.append('fin', dateFin);
        return this.httpClient.get( `acs/reservations/`, { params: params }) as Observable<Reservation[]>;
    }
    
    transformedReservationToSchedulerEvent(reservations): Promise<Event[]>{
        let eventList: Event[];
        
        reservations.forEach(function(resa) {
            eventList.push({id: resa.id, start_date: resa.dateEmprunt, end_date: resa.dateRestitution, text: ""});
        });
        
        return Promise.resolve(eventList);
    }
}