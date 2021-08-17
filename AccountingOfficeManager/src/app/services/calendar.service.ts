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
