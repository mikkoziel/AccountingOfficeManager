import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Employee } from '../entity/employee';
import { Roles } from '../entity/role';
import { WorkLog } from '../entity/worklog';
import { findInDictAfterCirc, getRole } from '../utils/utils';
import { CompanyService } from './company.service';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private server: ServerService,
    private cService: CompanyService
    ) { }

  // GETTERS 
  getEmployee(id){
    return this.server.request('GET', '/employee/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res: any) => {
        return this.parseEmployee(res);
      })
    );
  }

  getEmployeesForAdmin(id){
    return this.server.request('GET', '/employee/admin/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res: any) => {
        return this.parseEmployeeArray(res)
      })
    );
  }

  getWorkLogs(id){
    return this.server.request('GET', '/work-log/user/' + id)
      .pipe(
        // tap((res:Response) => console.log(res)),
        map((res: any) => {
          var worklogs = new Array<WorkLog>();
          res.forEach(x=>
            worklogs.push(this.parseWorkLog(x))
          );
          worklogs = this.sortByDate(worklogs);
          return worklogs;
        })
      );
  }

  // PARSERS AND TRANSFORMERS 

  checkEmployee(data, empl){
    if(empl.constructor == Object){
      return empl
    } else {
      return findInDictAfterCirc(data, "user_id", empl)
    }
  }

  parseEmployeeArray(data): Employee[] {
    var employees = new Array<Employee>();
    data.forEach(x=>{
      let empl = this.checkEmployee(data, x);
      employees.push(this.parseEmployee(empl))
    });
    return employees;

  }

  parseEmployee(data): Employee{
    let role_check = getRole(data["roles"])
    return <Employee>{ 
      id: data["user_id"],
      admin: data["admin"],
      company: this.cService.parseClientCompany(data["company"]),
      first_name: data["first_name"],
      last_name: data["last_name"],
      username: data["username"],
      role: role_check
    }
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

  parseWorkLog(data): WorkLog{
    return <WorkLog> {
      worklog_id: data['worklog_id'],
      date: new Date(data['date']),
      duration: this.convertWorklogDuration(data['duration'])
    }
  }

  convertWorklogDuration(dur){
    return Math.round((dur /(60 * 60) + Number.EPSILON) * 100) / 100;
  }

  public sortByDate(arr): Array<WorkLog> {
    arr.sort((a: WorkLog, b: WorkLog) => {
        return b.date.getTime() - a.date.getTime();
    });
    return arr;
  }
}
