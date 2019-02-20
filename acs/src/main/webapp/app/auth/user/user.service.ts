import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private userUrl = 'acs/test/user';
  private pmUrl = 'acs/test/pm';
  private adminUrl = 'acs/test/admin';
 
  constructor(private http: HttpClient) { }
 
  getUserBoard(): Observable<string> {
    console.log("user service");
    return this.http.get(this.userUrl, { responseType: 'text' });
  }
 
  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }
 
  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
}