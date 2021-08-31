import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entity/user';
import { CalendarService } from 'src/app/services/calendar.service';
import { UserService } from 'src/app/services/user.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { getUserFromArrayById, getUserFromArrayByUsername } from 'src/app/utils/utils';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  form: FormGroup;
  currentUser: User;

  participants: Array<User>;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  partCtrl = new FormControl();
  filteredParts: Observable<User[]>;
  selectedParts: User[] = [];
  allParts: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('partInput') partInput: ElementRef<HTMLInputElement>;
  
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
        this.filteredParts = this.partCtrl.valueChanges.pipe(
          // startWith(null),
          map((part: string | null) => {
            console.log(part)
            return part ? this._filter(part) : this.participants.slice()
          }));
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
      this.dialogRef.close();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(value)
    if (value) {
      var user = getUserFromArrayById(this.participants, value);
      this.selectedParts.push(user);
      console.log(this.selectedParts)
    }
    event.chipInput!.clear();
    this.partCtrl.setValue(null);
  }

  remove(part: User): void {
    // console.log(part)
    // var user = getUserFromArrayById(this.participants, part);
    const index = this.selectedParts.indexOf(part);
    if (index >= 0) {
      this.selectedParts.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var user = getUserFromArrayByUsername(this.participants, event.option.viewValue);
    this.selectedParts.push(user);
    this.partInput.nativeElement.value = '';
    this.partCtrl.setValue(null);
  }

  private _filter(val: string): User[] {
    console.log(val)
    let filterValue;
    if(isNaN(Number(val))){
      filterValue = val.toLowerCase();
      console.log("string: "+ filterValue)
    } else{
      filterValue = getUserFromArrayById(this.participants, val).username;
      console.log("number: "+ filterValue)
    }
    let filtered = this.participants.filter(user => user.username.toLowerCase().includes(filterValue));
    console.log(filtered)
    return filtered;
  }
  
}


