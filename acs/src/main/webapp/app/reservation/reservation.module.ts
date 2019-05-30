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
import { MatDialogModule, MatFormFieldModule, MatNativeDateModule, MatInputModule,MatCheckboxModule, MatSelectModule } from '@angular/material';
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
      MatDatepickerModule,
      NgbModule
    ],
    declarations:[ReservationComponent,ModalAjoutComponent,ArticleComponent],
    entryComponents:[ModalAjoutComponent],
    providers: [ReservationService, Http, DatePipe,httpInterceptorProviders]
})
export class ReservationModule{}