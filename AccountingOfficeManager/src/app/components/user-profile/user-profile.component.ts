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

    this.currentUser = this.userService.getCurrentUser(); 
    if(this.currentUser != undefined){
      this.dataSource = Object.entries(this.currentUser);
    }else{
      try {
        this.userService.getUserById(16).subscribe((res: User) => {
          this.currentUser = res;
          this.dataSource = Object.entries(this.currentUser); 
        })
      } catch (err) {
        console.log("No user");
      }
    }
    console.log(this.currentUser)

  }

  changePassword(){
    if (this.form.valid && this.form.value.new_password == this.form.value.rep_password) {
      this.userService.changePassword({
          "new_password": this.form.value.new_password,
          "old_password": this.form.value.old_password
      }).subscribe((res:Response) => console.log(res));
    } else {
      console.log("Passwords doesn't match.")
    }
  }

}
