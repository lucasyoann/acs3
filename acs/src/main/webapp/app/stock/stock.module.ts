import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';


import {StockComponent} from './stock.component';
import { StockRoutingModule } from './stock-routing.module';
import { MatDialogModule, MatFormFieldModule, MatNativeDateModule, MatInputModule,MatCheckboxModule, MatSelectModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StockService } from './stock.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

import {ModalModifArticleComponent} from './modal/modal-modif-article.component';

import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from 'src/main/webapp/app/auth/auth-interceptor';
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      StockRoutingModule,
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
    declarations:[StockComponent,ModalModifArticleComponent],
    entryComponents:[ModalModifArticleComponent],
    providers: [Http, httpInterceptorProviders, StockService]
})

export class StockModule{}