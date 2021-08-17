import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entity/user';
import { CalendarService } from 'src/app/services/calendar.service';
import { UserService } from 'src/app/services/user.service';
import { createFalse } from 'typescript';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  form: FormGroup;
  currentUser: User;

  constructor(
    public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarComponent,
    private fb: FormBuilder, 
    private calendarService: CalendarService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
    })
    this.form = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      title: ['', Validators.required],
      all_day: [false, Validators.required]
    });
  }

  async onSubmit(){
    await this.calendarService.saveCalendarEvent(
      this.currentUser.id,
      this.form.value["start_date"],
      this.form.value["end_date"],
      this.form.value["title"],
      this.form.value["all_day"],
    ).subscribe(x=>{
      console.log("UMPA LUMPAS")
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
