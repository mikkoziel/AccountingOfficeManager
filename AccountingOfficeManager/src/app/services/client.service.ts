import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Client } from '../entity/client';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private server: ServerService,
    ) { }

  getClientsForEmployee(id){
    console.log(id)
    return this.server.request('GET', '/client/user/' + id)
    .pipe(
      tap((res:Response) => console.log(res)),
      map((res: any) => {
        var worklogs = new Array<Client>();
        res.worklog.forEach(x=>
          worklogs.push(this.parseClient(x))
        );
        return worklogs;
      })
    );
  }

  parseClient(data): Client{
    return <Client>{
      user_id: data["user_id"],
      employee_id: data["employee_id"],
      company: data["company_id"]
    }
  }
}
