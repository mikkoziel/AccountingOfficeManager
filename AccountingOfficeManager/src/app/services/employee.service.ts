import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Parser } from '../utils/parser';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private server: ServerService,
    private parser: Parser
    ) { }

  // GETTERS 
  getEmployee(id){
    return this.server.request('GET', '/employee/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res: any) => {
        return this.parser.parseEmployee(res);
      })
    );
  }

  getEmployeesForAdmin(id){
    return this.server.request('GET', '/employee/admin/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res: any) => {
        return this.parser.parseEmployeeArray(res)
      })
    );
  }

  getWorkLogs(id){
    return this.server.request('GET', '/work-log/user/' + id)
      .pipe(
        // tap((res:Response) => console.log(res)),
        map((res: any) => { 
          return this.parser.parseWorkLogArray(res) 
        })
      );
  }

  saveWorklog(date, duration, user_id){
    var data = {
      "employee":{
        "user_id": user_id,
      },
      "date": date,
      "duration": duration,
    }
    return this.server.request('POST', '/work-log/', data)
  }

}
