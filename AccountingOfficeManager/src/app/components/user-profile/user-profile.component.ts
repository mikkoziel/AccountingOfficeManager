import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  displayedColumns: string[] = ['name', 'value'];
  dataSource;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    try {
      this.userService.getUserById(16).subscribe((res: User) => {
        this.user = res;
        this.dataSource = Object.entries(this.user); 
        // console.log(this.user)
      })
    } catch (err) {
      console.log("No user");
    }
  }

}
