import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {FormControl} from '@angular/forms';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

import { TokenStorageService } from '../auth/token-storage.service';
import {UserService} from '../user/user.service';
import {UserFonctionnel} from '../shared/user/userFonctionnel.entity';
import{User} from '../shared/user/user.entity';
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-myProfile',
    template:`<ngb-alert *ngIf="saveFailed">
        {{message}}
  </ngb-alert>
<ngb-alert [type]="'success'" *ngIf="saveSuccess">
        Mot de passe modifi&eacute; avec succ&egrave;s
  </ngb-alert>
<form (ngSubmit)="save()" ngNativeValidate>
    <div style="display:flex; margin : 10px;">
        <mat-card style="width:550px">
            <mat-card-header style="width:100%; display: flex; align-items:center;">
                <div mat-card-avatar><i class="fas fa-user" style="font-size:40px"></i></div>
                <mat-card-title>{{user.username}}</mat-card-title>
                <mat-card-subtitle style="margin:0" *ngIf="user.administrateur && user.superAdministrateur">Super Administrateur</mat-card-subtitle>
                <mat-card-subtitle style="margin:0" *ngIf="user.administrateur && !user.superAdministrateur">Administrateur</mat-card-subtitle>
                <mat-card-subtitle style="margin:0" *ngIf="!user.administrateur && !user.superAdministrateur">Utilisateur</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content style="display:flex; flex-direction:column; margin-top:10px;">
                <mat-form-field>
                    <input matInput required placeholder="Ancien mot de passe" type="password" id="oldPassword" name="oldPassword" [(ngModel)] = "oldPassword">
                </mat-form-field>
                <mat-form-field>
                    <input matInput required placeholder="Nouveau mot de passe" type="password" id="newPassword" name="newPassword" [(ngModel)] = "newPassword">
                </mat-form-field>
                <mat-form-field>
                    <input matInput required placeholder="Confirmation du nouveau mot de passe" type="password" id="passwordConfirm" name="passwordConfirm" [(ngModel)] = "passwordConfirm">
                </mat-form-field>
            </mat-card-content>
            <mat-card-actions>
                <button type="submit" style = "margin: 0px;" class="btn btn-success">Modifier</button>
            </mat-card-actions>
        </mat-card>
    </div>
</form>`
})
export class MyProfileComponent implements OnInit {
    
    username:string;
    checked : boolean =false;
    user : UserFonctionnel=new UserFonctionnel();
    controlUser : User = new User();
    controlledUser : User = new User();
    role:string;
    message : string;
    saveFailed : boolean = false;
    oldPassword : string;
    newPassword : string;
    passwordConfirm : string;
    saveSuccess : boolean =false;
    constructor(private token : TokenStorageService, private userService:UserService,
            public alertConfig: NgbAlertConfig) { 
        alertConfig.type = 'danger';
        alertConfig.dismissible = false;
    }
    
    ngOnInit() {
        
        this.username=this.token.getUsername();
        this.userService.getUser(this.username).subscribe(
                data=>{
                    this.user=data;
                    this.user.administrateur=false;
                    this.user.superAdministrateur =false;
                    this.user.roles.forEach(function(role : string){
                        if(role==="ROLE_ADMIN"){
                            this.user.administrateur=true;
                        }else if(role==="ROLE_SUPER_ADMIN"){
                            this.user.superAdministrateur=true;
                        }
                    }.bind(this));  
                },
                error=>{
                    this.message="Erreur de récupération de l'utilisateur";
                    this.saveFailed=true;
                }
        
        );
        
        
    }
    
    save(){
        
        this.controlUser.username=this.user.username;
        this.controlUser.password = this.oldPassword;
        this.userService.checkPassword(this.controlUser).subscribe(
                data=>{
                    this.checked=data;
                    if(!this.checked){
                        
                        this.message="Ancien mot de passe incorrect";
                        this.saveFailed=true;
                    }else{
                        this.controlledUser.username=this.user.username;
                        this.controlledUser.password=this.newPassword;
                        if(this.newPassword===this.passwordConfirm){
                            if(this.newPassword.length>=8){
                                this.userService.changePassword(this.controlledUser).subscribe(
                                        data=>{
                                            this.saveSuccess=true;
                                        },
                                        error=>{
                                            this.message="Erreur de changement de mot de passe";
                                            this.saveFailed=true;
                                        }
                                );
                            } else{
                                this.message="Au moins 8 caractères sont requis dans votre mot de passe";
                                this.saveFailed=true;
                            }
                        }else{
                            this.message="Le mot de passe doit être égal au mot de passe de confirmation";
                            this.saveFailed=true;
                        }
                    }
                },
                error=>{
                    this.message="Erreur de vérification du mot de passe";
                    this.saveFailed=true;
                }
                
                );
                
    }
}