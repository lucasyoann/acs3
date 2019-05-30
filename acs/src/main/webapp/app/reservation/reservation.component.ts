import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, SimpleChanges } from "@angular/core";
import "dhtmlx-scheduler";

import { ReservationService } from './reservation.service';
import { MatDialog } from '@angular/material';
import { ModalAjoutComponent } from './modal/modal-ajout.component';
import { ModalConsultationReservationComponent } from './modal/modal-consultation-reservation.component';
import { Reservation } from "src/main/webapp/app/shared/reservation/reservation.entity";
import { DatePipe } from '@angular/common';
import { TokenStorageService } from '../auth/token-storage.service';
import {UserService} from '../user/user.service';
import {UserFonctionnel} from '../shared/user/userFonctionnel.entity';
@Component( {
    encapsulation: ViewEncapsulation.None,
    selector: 'ref-reservations',
    templateUrl: './reservation.component.html'
} )
export class ReservationComponent implements OnInit {
    @ViewChild("scheduler_here") schedulerContainer: ElementRef;
    username:string;
    user : UserFonctionnel=new UserFonctionnel();
    saveFailed : boolean =false;
    message : string;
    
    
    constructor(public dialog: MatDialog, private reservationService:ReservationService, public datepipe: DatePipe,
            private token : TokenStorageService,private userService: UserService, private _elementRef : ElementRef){}
       
    ngOnInit() { 
        
        this.username=this.token.getUsername();
        this.userService.getUser(this.username).subscribe(
                data=>{
                    this.user=data;
                    this.user.administrateur=false;
                    this.user.superAdministrateur =false;
                    this.user.roles.forEach(function(role : string){
                        if(role==="ROLE_ADMIN"){
                            this.user.administrateur=true;
                        }else if(role==="ROLE_SUPER_ADMIN"){
                            this.user.superAdministrateur=true;
                        }
                    }.bind(this));  
                },
                error=>{
                    this.message="Erreur de récupération de l'utilisateur";
                    this.saveFailed=true;
                }
        
        );
        
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
            if( id> 1000000000000 && this.user.administrateur){
                var reservation = new Reservation();
                reservation.dateEmprunt = lightbox_event.start_date;
                const dialogRef = this.dialog.open(ModalAjoutComponent, {
                    width: '650px',
                    data: {reservation: reservation}
                });
                dialogRef.afterClosed().subscribe(result => {
                    scheduler.clearAll();
                    this.chargedResas();
                });
            }else if (this.user.administrateur){
                this.reservationService.getReservationById(id).subscribe(data=>{
                    var reservation=data;
                    const dialogRef = this.dialog.open(ModalAjoutComponent, {
                        width: '650px',
                        data: {reservation: reservation}
                    });
                    // rechargement du scheduler une fois la popup fermée
                    dialogRef.afterClosed().subscribe(result => {
                        scheduler.clearAll();
                        this.chargedResas();
                    });
                });
            }else{
                this.reservationService.getReservationById(id).subscribe(data=>{
                    var reservation=data;
                    const dialogRef = this.dialog.open(ModalConsultationReservationComponent, {
                        width: '650px',
                        data: {reservation: reservation}
                    });
                    dialogRef.afterClosed().subscribe(result => {
                        scheduler.clearAll();
                        this.chargedResas();
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
            width: '650px',
            data: {}
        });
    }

}