import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/entity/user';
import { WorkLog } from 'src/app/entity/worklog';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-work-management',
  templateUrl: './work-management.component.html',
  styleUrls: ['./work-management.component.css']
})
export class WorkManagementComponent implements OnInit, AfterViewInit  {
  currentUser: User;

  worklogs: Array<WorkLog>;
  displayedColumns: string[] = ['date', 'start-time', 'duration'];
  dataSource;
  
  date: Date;
  time: number = 3600;
  display ;
  interval;

  spinnerFlag = 0;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private employeeService: EmployeeService,
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      this.employeeService.getWorkLogs(this.currentUser.id).subscribe(res=>{
        // console.log(res)
        this.worklogs = res;
        this.dataSource = Object.entries(this.worklogs);
        this.spinnerFlag += 1;
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  startTimer() {
    console.log("=====>");
    this.date = new Date();
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display=this.transform( this.time)
    }, 1000);
  }

  transform(value: number, args?: any): string {

    const hours: number = Math.floor(value / 60);
    const minutes: number = (value - hours * 60);

    if (hours < 10 && minutes < 10) {
        return '0' + hours + ' : 0' + (value - hours * 60);
    }
    if (hours > 10 && minutes > 10) {
        return '0' + hours + ' : ' + (value - hours * 60);
    }
    if (hours > 10 && minutes < 10) {
        return hours + ' : 0' + (value - hours * 60);
    }
    if (minutes > 10) {
        return '0' + hours + ' : ' + (value - hours * 60);
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  stopTimer() {
    this.employeeService.saveWorklog(this.date, this.time, this.currentUser.id).subscribe(res=>{
      // console.log(res);
    })
    clearInterval(this.interval);
    this.time = 0;
    this.display=this.transform( this.time)
  }

}
