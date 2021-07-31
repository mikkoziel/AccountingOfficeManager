import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ao-contact',
  templateUrl: './ao-contact.component.html',
  styleUrls: ['./ao-contact.component.css']
})
export class AoContactComponent implements OnInit {
  currentUser: User

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
    })
  }

}
