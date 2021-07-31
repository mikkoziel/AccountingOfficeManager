import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) { 
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      // console.log(this.currentUser)
    })
  }

  ngOnInit(): void {
  }

}
