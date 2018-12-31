import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { ReservationService } from './reservation.service';

import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { ModalAjoutComponent } from './modal/modal-ajout.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      ReservationRoutingModule,
      MatDialogModule
    ],
    declarations:[ReservationComponent,ModalAjoutComponent],
    entryComponents:[ModalAjoutComponent],
    providers: [ReservationService, Http]
})
export class ReservationModule{}