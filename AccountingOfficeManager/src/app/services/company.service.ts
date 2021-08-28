import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ClientCompany } from '../entity/clientCompany';
import { Company } from '../entity/company';
import { Document } from '../entity/document';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private server: ServerService,
    ) { }

  getCompany(id){
    return this.server.request('GET', '/company/' + id)
    .pipe(
      tap((res:any)=> console.log(res)),
      map((res:any)=> {return this.parseCompany(res)})
    )
  }

  
  getDocumentForCompany(id){
    return this.server.request('GET', '/document/company/' + id)
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

  registerCC(data){
    let pum = {
      cc: {name: data["name"]},
      id: data["id"]
    }
    console.log(pum)
    return this.server.request('POST', '/cc/register', pum)
  }

  getCCForAO(id){
    return this.server.request('GET', '/cc/ao/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
        var clients = new Array<ClientCompany>();
        res.forEach(x=>
          clients.push(this.parseClientCompany(x))
        );
        return clients;
      })
    );
  }

  parseCompany(data): Company{
    return <Company>{
      company_id: data["company_id"],
      name: data["name"],
    }
  }

  parseClientCompany(data): ClientCompany{
      return <ClientCompany>{
        company_id: data["company_id"],
        name: data["name"],
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
