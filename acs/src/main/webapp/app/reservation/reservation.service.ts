import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Event } from '../shared/reservation/event';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";

@Injectable()
export class ReservationService {
    constructor(private httpClient: HttpClient) {}
    
    get(): Promise<Event[]>{
        return Promise.resolve([
            {id: 1, start_date: "2018-12-12 09:00", end_date: "2018-12-12 13:00", text: "Event 1"},
            {id: 2, start_date: "2018-12-13 00:00", end_date: "2018-12-14 13:00", text: "Event 2"},
        ]);
    }
    
    getReservation(): Observable<Reservation[]> {
        let params = new HttpParams();
        params = params.append('debut', "10/12/2018");
        params = params.append('fin', "31/12/2018");
        return this.httpClient.get( `acs/reservations/`, { params: params }) as Observable<Reservation[]>;
    }
}