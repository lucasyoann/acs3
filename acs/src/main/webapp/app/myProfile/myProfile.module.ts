import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { MyProfileComponent } from './myProfile.component';
import { MyProfileRoutingModule } from './myProfile-routing.module';

import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from 'src/main/webapp/app/auth/auth-interceptor';
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      MyProfileRoutingModule
    ],
    declarations:[MyProfileComponent],
    entryComponents:[],
    providers: [Http, httpInterceptorProviders]
})

export class MyProfileModule{}