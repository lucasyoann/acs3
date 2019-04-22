import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, SimpleChanges } from "@angular/core";
import "dhtmlx-scheduler";

import { ReservationService } from './reservation.service';
import { MatDialog } from '@angular/material';
import { ModalAjoutComponent } from './modal/modal-ajout.component';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";
import { DatePipe } from '@angular/common'

@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'ref-reservations',
    templateUrl: './reservation.component.html'
} )
export class ReservationComponent implements OnInit {
    @ViewChild("scheduler_here") schedulerContainer: ElementRef;
    
    constructor(public dialog: MatDialog, private reservationService:ReservationService, public datepipe: DatePipe){}
       
    ngOnInit() { 
        
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
        
        //Disabled drag
        scheduler.config.drag_resize = false;
        scheduler.config.drag_move = false;
        scheduler.config.drag_create = false;
        
       this.chargedResas();
        
        // Custom modal for add/update event
        // bind(this) permet de conserver le this comme etant le component et non la fonction
        scheduler.showLightbox = function(id) {
            var lightbox_event = scheduler.getEvent(id);
         
            scheduler.startLightbox(id, null); 
            scheduler.hideCover();
            if( id> 1000000000000){
                var reservation = new Reservation();
                reservation.dateEmprunt = lightbox_event.start_date;
                const dialogRef = this.dialog.open(ModalAjoutComponent, {
                    data: {reservation: reservation}
                });
            }else{
                this.reservationService.getReservationById(id).subscribe(data=>{
                    var reservation=data;
                    const dialogRef = this.dialog.open(ModalAjoutComponent, {
                        data: {reservation: reservation}
                    });
                });
            }
           
        }.bind(this);
        
        //Event permettant de gerer le changement de mois pour la recuperation des resas visibles
        scheduler.attachEvent("onViewChange", function (){
            this.chargedResas();
        }.bind(this));
        
    }
    
    chargedResas(){
        this.reservationService.getReservation(this.datepipe.transform(scheduler.getState().min_date, 'dd/MM/yyyy'),this.datepipe.transform(scheduler.getState().max_date, 'dd/MM/yyyy')).subscribe(data =>{
            this.reservationService.transformedReservationToSchedulerEvent(data).then((data) => {
                scheduler.parse(data, "json");
            });
        });
    }
    
    addResa(){
        const dialogRef = this.dialog.open(ModalAjoutComponent, {
            data: {}
        });
    }

}