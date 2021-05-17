import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientCompany } from '../interfaces/clientCompany';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  httpAddress = "http://localhost:3999/user-handler";

  constructor(private http:HttpClient,) { }

  getClients(){
    let clients = [
      <ClientCompany>{
        id: 1,
        name: "Facebook"
      },
      <ClientCompany>{
        id: 2,
        name: "Google"
      },
      <ClientCompany>{
        id: 3,
        name: "Microsoft"
      },
      <ClientCompany>{
        id: 4,
        name: "Volkwagen"
      },
      <ClientCompany>{
        id: 5,
        name: "BMW"
      },
    ]
    return clients;
  }
}
