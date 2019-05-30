import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { ModalConnexion } from './modal/modal-connexion.component';
import { TokenStorageService } from 'src/main/webapp/app/auth/token-storage.service';
import {AuthService} from 'src/main/webapp/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
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
        
        if(this.info.token !=null){
            
            
            this.authService.validateToken(this.info.token).subscribe(data =>{
                this.testAuth = data;
                
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
