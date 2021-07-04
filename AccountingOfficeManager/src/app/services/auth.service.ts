import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   APIEndpoint: string;

  constructor(private httpClient: HttpClient) {
     this.APIEndpoint = environment.APIEndpoint + "/authenticate";
   }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  login(email:string, password:string) {
    return this.httpClient.post<{access_token:  string}>(this.APIEndpoint, {email, password}).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token);
      })
      )
  }

  register(email:string, password:string) {
    return this.httpClient.post<{access_token: string}>(this.APIEndpoint, {email, password}).pipe(
      tap(res => {
        this.login(email, password)
      })
    )
  }

  logout() {
    localStorage.removeItem('access_token');
  }

}
