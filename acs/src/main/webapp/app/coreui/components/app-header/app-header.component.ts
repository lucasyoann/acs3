import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { ModalConnexion } from './modal/modal-connexion.component';
import { TokenStorageService } from '../../../auth/token-storage.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  template: `<header class="app-header navbar">
  <button class="navbar-toggler d-lg-none" type="button" appMobileSidebarToggler>
    <span class="navbar-toggler-icon"></span>
  </button>
    <a class="navbar-brand" href="#"></a>
  <button class="navbar-toggler d-md-down-none mr-auto" type="button" appSidebarToggler>
    <span class="navbar-toggler-icon"></span>
  </button>
  <div  *ngIf="!info.token || !testAuth" class="flex end">
    <button class="btn btn-success" style="margin-right:15px"
        (click)="signin()" title="Connexion">Connexion</button>
    </div>
    <div  *ngIf="info.token && testAuth" class="flex end">
    <button class="btn btn-success" style="margin-right:15px"
        (click)="logout()" title="D&eacute;connexion">D&eacute;connexion</button>
    </div>
</header>`
})
export class AppHeaderComponent implements OnInit{ 
    
    info: any;
    testAuth: boolean= false;
  
    constructor(public dialog: MatDialog, private token : TokenStorageService, 
            private authService : AuthService) { }
  
    ngOnInit() {
        this.info = {
                token:this.token.getToken(),
                username: this.token.getUsername(),
                authorities: this.token.getAuthorities()
        
        };
        console.log("token3 " + this.info.token)
        if(this.info.token !=null){
            console.log("token :" + this.info.token);
            
            this.authService.validateToken(this.info.token).subscribe(data =>{
                this.testAuth = data;
                console.log("data : " + data);
                console.log("testAuth : "+ this.testAuth);
                if(!this.testAuth){
                    console.log("token expiré");
                    this.token.signOut();
                }
                
            });
            
            

        }
    }
  
    signin(){
      const dialogRef = this.dialog.open(ModalConnexion, {
          data: {}
      });
    }
    
    logout() {
        this.token.signOut();
        window.location.reload();
      }
     
}
