import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Event } from '../shared/reservation/event';

@Injectable()
export class ReservationService {
    constructor(private httpClient: HttpClient) {}
    
    get(): Promise<Event[]>{
        return Promise.resolve([
            {id: 1, start_date: "2018-10-12 09:00", end_date: "2018-10-12 13:00", text: "Event 1"},
            {id: 2, start_date: "2018-10-13 00:00", end_date: "2018-10-14 13:00", text: "Event 2"},
        ]);
    }
}