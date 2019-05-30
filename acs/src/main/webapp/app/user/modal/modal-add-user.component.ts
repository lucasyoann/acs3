import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from './../user.service';

import { MatDialog } from '@angular/material';
import { UserFonctionnel } from '../../shared/user/userFonctionnel.entity';
import { User } from '../../shared/user/user.entity';


@Component( {
    selector: 'ref-modal-add-user',
    templateUrl: './modal-add-user.component.html',
    providers: [
                {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
                NgbAlertConfig
              ],
} )

export class ModalAddUserComponent implements OnInit {
    
    userWellFormed : User = new User();
    userAdd : UserFonctionnel = new UserFonctionnel();
    saveFailed : boolean;
    message : string;
    
    constructor(public dialogRef: MatDialogRef<ModalAddUserComponent>,
            @Inject(MAT_DIALOG_DATA) public data, private userService:UserService, private adapter: DateAdapter<any>,
            public alertConfig: NgbAlertConfig ) {
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
    ngOnInit() {
        
    }
    
    save(){
        this.saveFailed=false;
        if(this.userAdd.password === this.userAdd.passwordConfirm){
            if(this.userAdd.password.length>=8){
    
                if(this.userAdd.administrateur){
                    this.userWellFormed.role = new Array("ROLE_ADMIN","ROLE_USER");
                }else{
                    this.userWellFormed.role = new Array("ROLE_USER");
                }
                this.userWellFormed.password=this.userAdd.password;
                this.userWellFormed.username = this.userAdd.username;
                this.userWellFormed.email = this.userAdd.username.concat("@acs.Com");
                this.userService.addUser(this.userWellFormed).subscribe(
                        data=>{
                            this.dialogRef.close();
                            window.location.reload();
                        },
                        error=>{
                            this.message="Erreur de création de l'utilisateur";
                            this.saveFailed=true;
                        }
                );
            }else{
                this.message="Au moins 8 caractères sont requis dans votre mot de passe";
                this.saveFailed=true;
            }
        }else{
            this.message="Le mot de passe doit être égal au mot de passe de confirmation";
            this.saveFailed=true;
        }
            
    }
    
}