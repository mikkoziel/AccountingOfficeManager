import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ClientCompany } from '../entity/clientCompany';
import { User } from '../entity/user';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  APIEndpoint = environment.APIEndpoint;
  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);

  private _loggedIn = false;
  private _token: string;

  constructor(private http:HttpClient,) {
   }

  public get token(): string {
    return this._token;
  }
  public set token(value: string) {
    this._token = value;
  }

  public get loggedIn() {
    return this._loggedIn;
  }
  public set loggedIn(value) {
    this._loggedIn = value;
  }

  setLoggedIn(loggedIn: boolean, token?: string) {
    this.loggedIn = loggedIn;
    this.token = token;
  }

  request(method: string, route: string, data?: any) {
    if (method === 'GET') {
      return this.get(route, data);
    }

    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;

    return this.http.request(method, this.APIEndpoint + route, {
      body: data,
      responseType: 'json',
      observe: 'response',
      headers: header,
    });
  }

  get(route: string, data?: any) {
    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;

    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.get(this.APIEndpoint + route, {
      responseType: 'json',
      headers: header,
      params
    });
  }

  // getCurrentUser(){
  //   this.currentUser = <User>{
  //     id: 1,
  //     type: "Admin"
  //   }
  //   return this.currentUser
  // }

  // getClients(){
  //   let clients = [
  //     <ClientCompany>{
  //       id: 1,
  //       name: "Facebook"
  //     },
  //     <ClientCompany>{
  //       id: 2,
  //       name: "Google"
  //     },
  //     <ClientCompany>{
  //       id: 3,
  //       name: "Microsoft"
  //     },
  //     <ClientCompany>{
  //       id: 4,
  //       name: "Volkwagen"
  //     },
  //     <ClientCompany>{
  //       id: 5,
  //       name: "BMW"
  //     },
  //   ]
  //   return clients;
  // }
}
