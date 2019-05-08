import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Event } from '../shared/reservation/event';
import { DatePipe } from '@angular/common'
import { UserFonctionnel } from '../shared/user/userFonctionnel.entity';
import {User} from '../shared/user/user.entity';

const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

@Injectable()
export class UserService {
    
    private listUsers = 'acs/users/';
    private saveUSer = 'acs/users/'
    private deleteUserURL = 'acs/users/delete';
    private addUserURL = 'acs/auth/signup';
    private getUserURL = 'acs/users/getuser';
    private checkPasswordURL = 'acs/auth/checkpassword';
    private changePasswordURL = 'acs/auth/changepassword';
    
    constructor(private http: HttpClient) { }
    
    getUsers(): Observable<UserFonctionnel[]> {
        return this.http.get(this.listUsers) as Observable<UserFonctionnel[]>;
    }
    
    saveUser(user: UserFonctionnel) : Observable<UserFonctionnel>{
        return this.http.post<UserFonctionnel>(this.saveUSer, user, httpOptions);
    }
    
    deleteUserA(user: UserFonctionnel) : Observable<UserFonctionnel>{
        return this.http.post<UserFonctionnel>(this.deleteUserURL, user, httpOptions);
    }
    addUser(user:User) :  Observable<string> {
        return this.http.post<string>(this.addUserURL, user, httpOptions);
    }
    getUser(username:string) : Observable<UserFonctionnel>{
        let params = new HttpParams();
        params = params.append('username', username);
        return this.http.get(this.getUserURL,{ params: params }) as Observable<UserFonctionnel>;
    }
    
    checkPassword(user:User) : Observable<boolean>{
        return this.http.post<boolean>(this.checkPasswordURL, user, httpOptions);
    }
    
    changePassword(user:User) : Observable<string>{
        return this.http.post<string>(this.changePasswordURL, user, httpOptions);
    }
}