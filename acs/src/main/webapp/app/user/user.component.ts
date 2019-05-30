import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserFonctionnel } from '../shared/user/userFonctionnel.entity';
import { MatDialog } from '@angular/material';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';

import { ModalModifUserComponent } from './modal/modal-modif-user.component';
import { ModalDeleteUserComponent } from './modal/modal-delete-user.component';
import { ModalAddUserComponent } from './modal/modal-add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app-user',
    template: `<div style="display:flex; flex-direction:row; justify-content:space-between; align-items:center;">
    <h4>Gestion des utilisateurs</h4>
    <button class="btn btn-success" (click)="addUser()">Ajouter un utilisateur</button>
</div>
<div style="display:flex; flex-direction:row; flex-wrap:wrap">
<mat-card *ngFor="let user of users; index as i" style="width:350px; display:flex; margin-bottom: 15px; margin-right : 10px;">
  <mat-card-header style="width:100%; display: flex; align-items:center;">
    <div mat-card-avatar><i class="fas fa-user" style="font-size:40px"></i></div>
    <mat-card-title>{{user.username}}</mat-card-title>
    <mat-card-subtitle style="margin:0" *ngIf="user.administrateur && user.superAdministrateur">Super Administrateur</mat-card-subtitle>
    <mat-card-subtitle style="margin:0" *ngIf="user.administrateur && !user.superAdministrateur">Administrateur</mat-card-subtitle>
    <mat-card-subtitle style="margin:0" *ngIf="!user.administrateur && !user.superAdministrateur">Utilisateur</mat-card-subtitle>
  </mat-card-header>
  <mat-card-actions style="margin-left: 30px; display: flex; flex-direction: column; padding-top: 0px; align-self: flex-end;">
    <button style = "margin: 0px;" class="btn btn-success"(click)="updateUser(i)">Modifier</button>
    <button class="btn btn-success"(click)="deleteUser(i)">Supprimer</button>
  </mat-card-actions>
</mat-card>
</div>`
})
export class UserComponent implements OnInit {
  users : UserFonctionnel[]=[];
  superAdministrateur : boolean = false;
 
  constructor(private userService: UserService, public dialog: MatDialog, private router: Router, private token : TokenStorageService) { }
 
  ngOnInit() {
    
    this.token.getAuthorities().forEach(function(role : string){
        if(role==="ROLE_SUPER_ADMIN"){
            this.superAdministrateur=true;
        }
    }.bind(this));  
    if(this.superAdministrateur){
        this.userService.getUsers().subscribe(
                data => {
                    this.users=data;
                    data.forEach(function (user : UserFonctionnel) {
                        user.administrateur=false;
                        user.roles.forEach(function(role : string){
                            if(role==="ROLE_ADMIN"){
                                user.administrateur=true;
                            }else if(role==="ROLE_SUPER_ADMIN"){
                                user.superAdministrateur=true;
                            }
                        });   
                    }); 
                },
                error => {
                    console.log("userService KO");
                }
        );
      }else{
          this.router.navigate( ['/dashboard']);
      }
  }
  
  updateUser(index : number){
      const dialogRef = this.dialog.open(ModalModifUserComponent, {
          data: {user: this.users[index]}
      });
  }
  
  deleteUser(index : number){
      const dialogRef = this.dialog.open(ModalDeleteUserComponent, {
          data: {user: this.users[index]}
      });
  }
  
  addUser(){
      const dialogRef = this.dialog.open(ModalAddUserComponent, {
          width: '500px',
          data: {}
      });
  }
}