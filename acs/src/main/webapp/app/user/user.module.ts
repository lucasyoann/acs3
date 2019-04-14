import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';


import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from "src/main/webapp/app/auth/user/user.service";
import { httpInterceptorProviders } from 'src/main/webapp/app/auth/auth-interceptor';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      UserRoutingModule
    ],
    declarations:[UserComponent],
    entryComponents:[],
    providers: [Http, UserService,httpInterceptorProviders]
})

export class UserModule{}