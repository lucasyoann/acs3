import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { ReservationService } from './reservation.service';

import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { httpInterceptorProviders } from '../auth/auth-interceptor';


import { ModalAjoutComponent } from './modal/modal-ajout.component';
import { ModalListErreurComponent } from './modal/modal/modalListeErreur.component';
import { ModalConsultationReservationComponent } from './modal/modal-consultation-reservation.component';
import { MatDialogModule, MatFormFieldModule, MatNativeDateModule, MatInputModule,MatCheckboxModule, MatSelectModule,MatListModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleComponent } from './modal/articleComponent/article.component';

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
      MatListModule,
      MatDatepickerModule,
      NgbModule
    ],
    declarations:[ReservationComponent,ModalAjoutComponent,ArticleComponent,ModalConsultationReservationComponent, ModalListErreurComponent],
    entryComponents:[ModalAjoutComponent, ModalConsultationReservationComponent, ModalListErreurComponent],
    providers: [ReservationService, Http, DatePipe,httpInterceptorProviders]
})
export class ReservationModule{}