import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: User;
  displayedColumns: string[] = ['name', 'value'];
  dataSource;

  form: FormGroup;
  hide1 = true;
  hide2 = true;
  hide3 = true;

  spinnerFlag = 0;

  constructor(
    private userService: UserService,
    private fb: FormBuilder, 
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
      rep_password: ['', Validators.required],
    });

    
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      this.dataSource = Object.entries(this.currentUser);
      this.spinnerFlag += 1;
    })
  }

  changePassword(){
    
    this.spinnerFlag -= 1;
    if (this.form.valid && this.form.value.new_password == this.form.value.rep_password) {
      this.userService.changePassword({
          "new_password": this.form.value.new_password,
          "old_password": this.form.value.old_password
      }).subscribe((res:Response) => {
        // console.log(res)
      });
    } else {
      console.log("Passwords doesn't match.")
    }
    this.spinnerFlag += 1;
  }

}
