import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './../user.service';

import { MatDialog } from '@angular/material';
import { UserFonctionnel } from '../../shared/user/userFonctionnel.entity';

@Component( {
    selector: 'ref-modal-modif-user',
    templateUrl: './modal-modif-user.component.html',
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
                NgbAlertConfig
              ],
} )

export class ModalModifUserComponent implements OnInit {
    
    titre : string;
    message : string;
    saveFailed : boolean=false;
    userAdd : UserFonctionnel = new UserFonctionnel();
    labelBouton : string;
    creation : boolean;
    
    constructor(public dialogRef: MatDialogRef<ModalModifUserComponent>,
            @Inject(MAT_DIALOG_DATA) public data, private userService:UserService, private adapter: DateAdapter<any>,
            public alertConfig: NgbAlertConfig ) {
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
    ngOnInit() {
        if(this.data.user){
            this.creation=false;
            this.titre = "Modification d'un utilisateur";
            this.userAdd = this.data.user;
            this.labelBouton = "Modifier";
        }else{
            this.message="Erreur de récupération de l'utilisateur";
            this.saveFailed=true;
        }
            
    }
    
    save(){
        this.userAdd.roles=null;
        if(this.userAdd.administrateur){
            this.userAdd.roles = new Array("ROLE_ADMIN","ROLE_USER");
        }else{
            this.userAdd.roles = new Array("ROLE_USER");
        }
        this.userService.saveUser(this.userAdd).subscribe(
          data=>{
              this.dialogRef.close();
              window.location.reload();
          },
          error=>{
              this.message="Erreur d'enregistrement de l'utilisateur";
              this.saveFailed=true;
          }
        );
    }
    
}