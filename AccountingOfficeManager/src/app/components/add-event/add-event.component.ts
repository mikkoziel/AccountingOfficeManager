import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entity/user';
import { CalendarService } from 'src/app/services/calendar.service';
import { UserService } from 'src/app/services/user.service';
import { ItemList } from 'src/app/utils/utils';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  form: FormGroup;
  currentUser: User;

  participants: Array<User>;
  
  spinnerFlag = 0;

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
      this.userService.getParticipants(this.currentUser.id).subscribe(parts=>{
        console.log(parts);
        this.participants = parts;
      })
    })
    this.form = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      title: ['', Validators.required],
      all_day: [false, Validators.required]
    });
  }

  async onSubmit(){
    this.spinnerFlag += 1
    await this.calendarService.saveCalendarEvent(
      this.currentUser.id,
      this.form.value["start_date"],
      this.form.value["end_date"],
      this.form.value["title"],
      this.form.value["all_day"],
    ).subscribe(x=>{
      this.spinnerFlag -= 1
      // console.log("UMPA LUMPAS")
      this.dialogRef.close();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}
