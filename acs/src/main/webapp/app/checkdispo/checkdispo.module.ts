import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { CheckDispoComponent } from './checkdispo.component';
import { CheckDispoRoutingModule } from './checkdispo-routing.module';
import { MatDialogModule, MatFormFieldModule, MatNativeDateModule, MatInputModule,MatCheckboxModule, MatSelectModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user/user.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from 'src/main/webapp/app/auth/auth-interceptor';
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      CheckDispoRoutingModule,
      MatCardModule,
      MatDialogModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatInputModule, 
      MatCheckboxModule,
      MatSelectModule,
      NgbModule,
      MatDatepickerModule,
      MatTableModule,
      MatSortModule
    ],
    declarations:[CheckDispoComponent],
    entryComponents:[],
    providers: [Http, httpInterceptorProviders, UserService]
})

export class CheckDispoModule{}