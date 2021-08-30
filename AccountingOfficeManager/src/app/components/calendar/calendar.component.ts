import { Input, Component, TemplateRef, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { Time, WeekDay } from '@angular/common';
import { CalendarEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { User } from 'src/app/entity/user';
import { CalendarService } from 'src/app/services/calendar.service';
import { UserService } from 'src/app/services/user.service';
import { AddEventComponent } from '../add-event/add-event.component';
// import { addMinutes, addHours, endOfDay, startOfDay } from 'date-fns';

var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  currentUser: User;
  
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  dayStartHour: number = 5;
  dayEndHour: number = 24;

  events: CalendarEvent[] = [];

  excludeDays: number[] = [0, 6];
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  CalendarView = CalendarView;
  
  activeDayIsOpen: boolean = true;

  spinnerFlag = 0

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private calendarService: CalendarService
    ) {
  }

  ngOnInit(){
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      console.log(user)
      this.calendarService.getCalendarForUser(this.currentUser.id).subscribe(result=>{
        console.log(result)
        result.forEach(x=>{
          this.events.push(
            <CalendarEvent>{
              start: x.start_date,
              end: x.end_date,
              title: x.title,
              allDay: x.all_day
            }
          )
        })
        this.spinnerFlag = 1
      })
    })
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  
  setView(view: CalendarView) {
    this.view = view;
  }

  openAddEvent(){
    let dialogRef = this.dialog.open(AddEventComponent, {
      height: '400px',
      width: '600px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}