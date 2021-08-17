import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Calendar } from '../entity/calendar';
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
        var calendars = new Array<Calendar>();
        res.forEach(x=>
          calendars.push(this.parseCalendar(x))
        );
        return calendars;
      })
    );
  }

  saveCalendarEvent(user_id, start_date, end_date, title, all_day){
    var data = {
      "user_id": user_id,
      "start_date": start_date,
      "end_date": end_date,
      "title": title,
      "all_day": all_day
    }
    return this.server.request('POST', '/calendar/', data)
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
