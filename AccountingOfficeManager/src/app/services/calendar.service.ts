import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Calendar } from '../entity/calendar';
import { findInDictAfterCirc } from '../utils/utils';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private server: ServerService,
  ) { }

  getCalendarForUser(id){
    return this.server.request('GET', '/calendar/user/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res:any) => {
          return this.parseCalendarArray(res)
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

  parseCalendarArray(data): Calendar[]{
    var calendars = new Array<Calendar>();
    data.forEach(x=> {
      let event = this.checkEvent(data, x)
      calendars.push(this.parseCalendar(event))
    });
    return calendars;
  }

  checkEvent(data, event){
    if(event.constructor == Object){
      return event
    } else {
      return findInDictAfterCirc(data, "calendar_id", event)
    }
  }

  parseCalendar(data): Calendar{
    return <Calendar>{
      calendar_id: data['calendar_id'],
      user_id: data['user_id'],
      start_date: new Date(data['start_date']),
      end_date: new Date(data['end_date']),
      title: data['title'],
      all_day: data['all_day']
    }
  }
}
