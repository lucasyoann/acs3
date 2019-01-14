import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";

import { ReservationService } from './reservation.service';
import { MatDialog } from '@angular/material';
import { ModalAjoutComponent } from './modal/modal-ajout.component';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'ref-reservations',
    templateUrl: './reservation.component.html'
} )
export class ReservationComponent implements OnInit {
    @ViewChild("scheduler_here") schedulerContainer: ElementRef;
    
    constructor(public dialog: MatDialog, private reservationService:ReservationService){}
    
    ngOnInit() { 
        
        this.reservationService.getReservation().subscribe(data =>{
            console.log(data);
        });
        // Changement langue de anglais vers français
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
        // Vue moi par défault
        scheduler.init(this.schedulerContainer.nativeElement, new Date(),"month");
        scheduler.config.xml_date = "%Y-%m-%d %H:%i";
        
        this.reservationService.get()
            .then((data) => {
                 scheduler.parse(data, "json");
        });
        // Custom modal for add/update event
        // bind(this) permet de conserver le this comme etant le component et non la fonction
        scheduler.showLightbox = function(id) {
            var lightbox_event = scheduler.getEvent(id);
            console.log(lightbox_event);
            scheduler.startLightbox(id, null); 
            scheduler.hideCover();
            var reservation = new Reservation();
            reservation.dateEmprunt = lightbox_event.start_date;
            const dialogRef = this.dialog.open(ModalAjoutComponent, {
                data: {reservation: reservation}
            });
        }.bind(this);
    }
    
    addResa(){
        const dialogRef = this.dialog.open(ModalAjoutComponent, {
            data: {}
        });
    }

}