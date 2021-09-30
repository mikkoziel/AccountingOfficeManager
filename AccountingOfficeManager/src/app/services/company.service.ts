import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Parser } from '../utils/parser';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private server: ServerService,
    private parser: Parser
    ) { }

  getCompany(id){
    return this.server.request('GET', '/company/' + id)
    .pipe(
      // tap((res:any)=> console.log(res)),
      map((res:any)=> {
        return this.parser.parseCompany(res);
      })
    )
  }

  
  getDocumentForCompany(id){
    return this.server.request('GET', '/document/company/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
        return this.parser.parseDocumentArray(res);
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
        return this.parser.parseCCArray(res);
      })
    );
  }

  getCompanyInfo(id){
    return this.server.request('GET', '/cc/cc-info/' + id)
    .pipe(
      // tap((res:any)=> console.log(res)),
      map((res:any)=> {
        return this.parser.parseCompanyInfo(res);
      })
    )
  }

}
