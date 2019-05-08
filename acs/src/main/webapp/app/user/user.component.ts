import { Component, OnInit } from '@angular/core';
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
  selector: 'app-user',
  templateUrl: './user.component.html'
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