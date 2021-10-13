import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Client } from '../entity/client';
import { Document } from '../entity/document';
import { findInDictAfterCirc, getRole } from '../utils/utils';
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
        return this.parseClientInfo(res);
      })
    );
  }

  parseClientInfo(res){
    return {
      "client": this.parseClient(res["client"]),
      "documents": this.parseDocumentArrayFromClientInfo(res["documents"], res)
    }
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

  parseDocumentArrayFromClientInfo(data, docs): Document[]{
    var documents = new Array<Document>();
    data.forEach(x=> {
      let doc = this.checkDocument(docs, x);
      documents.push(this.parseDocument(doc))
    });
    console.log(documents)
    return documents;
  }

  parseDocumentArray(data): Document[]{
    var documents = new Array<Document>();
    data.forEach(x=> {
      let doc = this.checkDocument(data, x);
      documents.push(this.parseDocument(doc))
    });
    console.log(documents)
    return documents;
  }

  checkDocument(data, document){
    console.log(document)
    if(document.constructor == Object){
      return document
    } else {
      return findInDictAfterCirc(data, "document_id", document)
    }
  }

  parseDocument(data): Document{
    return <Document>{
      document_id: data["document_id"],
      name: data["name"],
      path: data["path"],
      description: data["description"]
    }
  }

}
