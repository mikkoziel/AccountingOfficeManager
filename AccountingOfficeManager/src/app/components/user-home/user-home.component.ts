import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  currentUser: User;

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    this.currentUser = this.serverService.getCurrentUser();
  }

}
