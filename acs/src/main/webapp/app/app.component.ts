import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/main/webapp/app/auth/token-storage.service';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
 
  constructor(private tokenStorage: TokenStorageService) { }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
        console.log("start");
        console.log("token : " + this.tokenStorage.getToken());
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_SUPER_ADMIN') {
          this.authority = 'superAdmin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
      console.log(this.authority);
    }
  }
}
