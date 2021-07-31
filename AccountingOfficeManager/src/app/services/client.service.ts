import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Client } from '../entity/client';
import { ClientCompany } from '../entity/clientCompany';
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

  getClientsForEmployee(id){
    console.log(id)
    return this.server.request('GET', '/client/user/' + id)
    .pipe(
      tap((res:Response) => console.log(res)),
      map((res:any) => {
        var clients = new Array<Client>();
        res.forEach(x=>
          clients.push(this.parseClient(x))
        );
        return clients;
      })
    );
  }

  parseClient(data): Client{
    return <Client>{
      id: data["user_id"],
      employee_id: data["employee_id"],
      company: this.cService.parseClientCompany(data["company"]),
      first_name: data["first_name"],
      last_name: data["last_name"],
      username: data["username"],
      role: data["role"],
    }
  }

}
