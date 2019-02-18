import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { ModalConnexion } from './modal/modal-connexion.component';
import { TokenStorageService } from 'src/main/webapp/app/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit{ 
    
    info: any;
  
    constructor(public dialog: MatDialog, private token : TokenStorageService) { }
  
    ngOnInit() {
        this.info = {
                token:this.token.getToken(),
                username: this.token.getUsername(),
                authorities: this.token.getAuthorities()
        
        };
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
