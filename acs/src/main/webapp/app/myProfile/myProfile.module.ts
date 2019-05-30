import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { MyProfileComponent } from './myProfile.component';
import { MyProfileRoutingModule } from './myProfile-routing.module';
import { MatDialogModule, MatFormFieldModule, MatNativeDateModule, MatInputModule,MatCheckboxModule, MatSelectModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user/user.service';

import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from 'src/main/webapp/app/auth/auth-interceptor';
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      MyProfileRoutingModule,
      MatCardModule,
      MatDialogModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatInputModule, 
      MatCheckboxModule,
      MatSelectModule,
      NgbModule
    ],
    declarations:[MyProfileComponent],
    entryComponents:[],
    providers: [Http, httpInterceptorProviders, UserService]
})

export class MyProfileModule{}