import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Parser } from '../utils/parser';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private server: ServerService,
    private parser: Parser
  ) { }

  getCalendarForUser(id){
    return this.server.request('GET', '/calendar/user/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
          return this.parser.parseCalendarArray(res)
      })
    );
  }

  saveCalendarEvent(data){
    var users = data["parts"].slice()
    users.push(data["user"])
    var tmp = {
      "calendar":{         
        "start_date": data["start_date"],
        "end_date": data["end_date"],
        "title": data["title"],
        "all_day": data["all_day"],
      },
      "users": users 
    }
    return this.server.request('POST', '/calendar/parts/', tmp)
  }



}
