import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Client } from '../entity/client';
import { Document } from '../entity/document';
import { getRole } from '../utils/utils';
import { CompanyService } from './company.service';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private server: ServerService,
    private cService: CompanyService
    ) { }

  getClient(id){
    return this.server.request('GET', '/user/' + id)
    .pipe(
      tap((res:Response) => console.log(res)),
      map((res:any) => {
        return this.parseClient(res);
      })
    );

  }

  getClientsForEmployee(id){
    return this.server.request('GET', '/client/user/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
        var clients = new Array<Client>();
        res.forEach(x=>
          clients.push(this.parseClient(x))
        );
        return clients;
      })
    );
  }

  getDocumentForClient(id){
    return this.server.request('GET', '/document/user/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
        var documents = new Array<Document>();
        res.forEach(x=>
          documents.push(this.parseDocument(x))
        );
        return documents;
      })
    );
    
  }

  parseClient(data): Client{
    let role_check = getRole(data["roles"])
      return <Client>{
        id: data["user_id"],
        employee_id: data["employee"],
        company: this.cService.parseClientCompany(data["company"]),
        first_name: data["first_name"],
        last_name: data["last_name"],
        username: data["username"],
        role: role_check,
      }
  }

  parseDocument(data): Document{
    return <Document>{
      document_id: data["document_id"],
      path: data["path"],
      description: data["description"]
    }
  }

}
