import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
 
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private loginUrl = 'acs/auth/signin';
  private valToken = 'acs/auth/validate';
  private signout = 'acs/auth/signout';
 
  constructor(private http: HttpClient) {
  }
 
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
  
  validateToken(token : string): Observable<boolean> {
      let params = new HttpParams();
      params = params.append('token', token);
      return this.http.get( this.valToken, { params: params }) as Observable<boolean>;
  }
 
  
}