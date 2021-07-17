import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { WorkLog } from '../entity/worklog';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private server: ServerService,
    ) { }

  getWorkLogs(id){
    return this.server.request('GET', '/user/' + id)
      .pipe(
        // tap((res:Response) => console.log(res)),
        map((res: any) => {
          var worklogs = new Array<WorkLog>();
          res.worklog.forEach(x=>
            worklogs.push(this.parseWorkLog(x))
          );
          worklogs = this.sortByDate(worklogs);
          return worklogs;
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
