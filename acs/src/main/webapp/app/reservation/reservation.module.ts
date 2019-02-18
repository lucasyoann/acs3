import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { ReservationService } from './reservation.service';

import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { httpInterceptorProviders } from 'src/main/webapp/app/auth/auth-interceptor';


import { ModalAjoutComponent } from './modal/modal-ajout.component';
import { MatDialogModule, MatFormFieldModule, MatNativeDateModule, MatInputModule,MatCheckboxModule, MatSelectModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { DatePipe } from '@angular/common';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      ReservationRoutingModule,
      MatDialogModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatInputModule, 
      MatCheckboxModule,
      MatSelectModule,
      MatDatepickerModule
    ],
    declarations:[ReservationComponent,ModalAjoutComponent],
    entryComponents:[ModalAjoutComponent],
    providers: [ReservationService, Http, DatePipe,httpInterceptorProviders]
})
export class ReservationModule{}