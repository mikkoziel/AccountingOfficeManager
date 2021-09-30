import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Client } from '../entity/client';
import { Parser } from '../utils/parser';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private server: ServerService,
    private parser: Parser
    ) { }

  getClient(id){
    return this.server.request('GET', '/user/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
        return this.parser.parseClient(res);
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
        return this.parser.parseClientArray(res);
      })
    );
  }

  getClientsForCompany(id){
    return this.server.request('GET', '/client/cc/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
        return this.parser.parseClientArray(res);
      })
    );
  }

  getClientsForAdmin(id){
    return this.server.request('GET', '/client/admin/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res: any) => {
        return this.parser.parseClientArray(res)
      })
    )
  }

  getDocumentForClient(id){
    return this.server.request('GET', '/document/user/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
        return this.parser.parseDocumentArray(res);
      })
    );
  }

  addDocument(data){
    var document = {      
      name: data["name"],
      description: data["description"],
      client:{
        user_id: data["user_id"]
      }
    }
    var fd = new FormData();
    fd.append('file', data["file"], data["file"].name);
    fd.append('document', JSON.stringify(document));

    return this.server.request('POST', '/document/', fd)
  }

  getDocument(id){
    return this.server.getFile('/document/' + id)
    .pipe(
      // tap((res)=>{console.log(res)}),
      map((res)=>{
        return new Blob([res], {type: 'application/pdf'})
      })
    )
  }

  getClientInfo(id){
    return this.server.request('GET', '/client/client-info/' + id)
    .pipe(
      tap((res:Response) => console.log(res)),
      map((res:any) => {
        return this.parser.parseClientInfo(res);
      })
    );
  }

}
