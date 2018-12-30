import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";
//import {} from "@types/dhtmlxscheduler";

import { ReservationService } from './reservation.service';

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'ref-reservations',
    templateUrl: './reservation.component.html'
} )
export class ReservationComponent implements OnInit {
    @ViewChild("scheduler_here") schedulerContainer: ElementRef;
    
    constructor(private reservationService:ReservationService){}
    
    ngOnInit() {
        scheduler.init(this.schedulerContainer.nativeElement, new Date());
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        scheduler.init(this.schedulerContainer.nativeElement);
        this.reservationService.get()
            .then((data) => {
                 scheduler.parse(data, "json");
            });
    }
}