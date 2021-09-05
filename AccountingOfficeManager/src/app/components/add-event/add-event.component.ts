import { Component, ElementRef, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  @ViewChild('partInput') partInput: ElementRef<HTMLInputElement>;
  
  spinnerFlag = 0;

  @ViewChild('warningDialog') warningDialog: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarComponent,
    private fb: FormBuilder, 
    private calendarService: CalendarService,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      this.userService.getParticipants(this.currentUser.id).subscribe(parts=>{
        this.participants = parts;
        this.filteredParts = this.partCtrl.valueChanges.pipe(
          map((part: string | null) => {
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
    if(this.checkSubmitDates(this.form.value["start_date"], this.form.value["end_date"])){
      this.spinnerFlag += 1
      await this.calendarService.saveCalendarEvent({
        user: this.currentUser,
        start_date: this.form.value["start_date"],
        end_date: this.form.value["end_date"],
        title: this.form.value["title"],
        all_day: this.form.value["all_day"],
        parts: this.selectedParts
      }).subscribe(()=>{
        this.spinnerFlag -= 1
        this.dialogRef.close();
      })
    } else {
      this.dialog.open(this.warningDialog);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      var user = getUserFromArrayById(this.participants, value);
      this.selectedParts.push(user);
      this.participants = this.participants.filter(obj => obj.id !== user.id);
    }
    event.chipInput!.clear();
    this.partCtrl.setValue(null);
  }

  remove(part: User): void {
    const index = this.selectedParts.indexOf(part);
    if (index >= 0) {
      this.selectedParts.splice(index, 1);
      this.participants.push(part);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    var user = getUserFromArrayByUsername(this.participants, event.option.viewValue);
    this.selectedParts.push(user);
    this.participants = this.participants.filter(obj => obj.id !== user.id);
    this.partInput.nativeElement.value = '';
    this.partCtrl.setValue(null);
  }

  private _filter(val: string): User[] {
    let filterValue: string;
    if(isNaN(Number(val))){
      filterValue = val.toLowerCase();
    } else{
      filterValue = getUserFromArrayById(this.participants, val).username;
    }
    let filtered = this.participants.filter(user => user.username.toLowerCase().includes(filterValue));
    return filtered;
  }

  private checkSubmitDates(start, end): boolean{
    return this.inFuture(start) &&
          this.inFuture(end) &&
          start < this.inFuture(end)
  }

  private inFuture(date: Date) {
    return date > new Date()
  };
  
}


