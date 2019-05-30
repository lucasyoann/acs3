import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import {ModalModifUserComponent} from './modal/modal-modif-user.component';
import {ModalDeleteUserComponent} from './modal/modal-delete-user.component';
import {ModalAddUserComponent} from './modal/modal-add-user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatFormFieldModule, MatNativeDateModule, MatInputModule,MatCheckboxModule, MatSelectModule } from '@angular/material';
import { UserService } from './user.service';
import { httpInterceptorProviders } from 'src/main/webapp/app/auth/auth-interceptor';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      UserRoutingModule,
      MatCardModule,
      MatDialogModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatInputModule, 
      MatCheckboxModule,
      MatSelectModule,
      NgbModule
    ],
    declarations:[UserComponent, ModalModifUserComponent, ModalDeleteUserComponent,ModalAddUserComponent],
    entryComponents:[ModalModifUserComponent, ModalDeleteUserComponent, ModalAddUserComponent],
    providers: [Http, UserService,httpInterceptorProviders]
})

export class UserModule{}