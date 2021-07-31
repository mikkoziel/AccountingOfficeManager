import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Employee } from '../entity/employee';
import { WorkLog } from '../entity/worklog';
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
  getEmployeesForAdmin(id){
    return this.server.request('GET', '/employee/admin/' + id)
    .pipe(
      tap((res:Response) => console.log(res)),
      map((res: any) => {
        var employees = new Array<Employee>();
        res.forEach(x=>
          employees.push(this.parseEmployee(x))
        );
        return employees;
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
  parseEmployee(data): Employee{
    return <Employee>{ 
      id: data["user_id"],
      admin_id: data["admin_id"],
      company: this.cService.parseClientCompany(data["company"]),
      first_name: data["first_name"],
      last_name: data["last_name"],
      username: data["username"],
      role: data["role"],
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
    console.log(data)
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
    console.log(arr)
    arr.sort((a: WorkLog, b: WorkLog) => {
        return b.date.getTime() - a.date.getTime();
    });
    console.log(arr)
    return arr;
  }
}
