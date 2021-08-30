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
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
        return this.parseClient(res);
      })
    );
  }

  registerClient(data){
    return this.server.request('POST', '/client/', {
      username: data['username'],
      first_name: data['first_name'],
      last_name: data['last_name'],
      password: data['password'],
      company: {
        company_id: data['company_id'],
      },
      employee: {
        user_id: data['employee_id']
      },
      roles:[
        {role_id:3}
      ]
    })
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

  getClientsForCompany(id){
    return this.server.request('GET', '/client/cc/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
        return this.parseClientArray(res)
      })
    );
  }

  getClientsForAdmin(id){
    return this.server.request('GET', '/client/admin/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res: any) => {
        return this.parseClientArray(res)
      })
    )
  }

  getDocumentForClient(id){
    return this.server.request('GET', '/document/user/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
        return this.parseDocumentArray(res);
      })
    );
    
  }

  parseClientArray(data): Client[] {
    var clients = new Array<Client>();
    data.forEach(x=>
      clients.push(this.parseClient(x))
    );
    return clients;
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

  parseDocumentArray(data): Document[]{
    var documents = new Array<Document>();
    data.forEach(x=>
      documents.push(this.parseDocument(x))
    );
    return documents;
  }

  parseDocument(data): Document{
    return <Document>{
      document_id: data["document_id"],
      path: data["path"],
      description: data["description"]
    }
  }

}
