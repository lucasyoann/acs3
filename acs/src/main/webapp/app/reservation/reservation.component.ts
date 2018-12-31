import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";

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
        const sld: SchedulerLocaleDate = {
            month_full: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
            month_short: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"],
            day_full: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
            day_short: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]     
        };
        const sll: SchedulerLocaleLabels = {
                dhx_cal_today_button: "Aujourd'hui",
                day_tab: "Jour",
                week_tab: "Semaine",
                month_tab: "Mois",
                new_event: "Nouvel événement",
                icon_save: "Enregistrer",
                icon_cancel: "Annuler",
                icon_details: "Détails",
                icon_edit: "Modifier",
                icon_delete: "Effacer",
                confirm_closing: "", //Vos modifications seront perdus, êtes-vous sûr ?
                confirm_deleting: "L'événement sera effacé sans appel, êtes-vous sûr ?",
                section_description: "Description",
                section_time: "Période",
                unit_tab: ""
        };
        const locale: SchedulerLocale={
                date: sld,
                labels: sll
        }
        scheduler.locale = locale;
        scheduler.init(this.schedulerContainer.nativeElement, new Date());
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        scheduler.init(this.schedulerContainer.nativeElement);
        
        this.reservationService.get()
            .then((data) => {
                 scheduler.parse(data, "json");
            });
    }
}