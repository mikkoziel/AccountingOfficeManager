import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './entity/user';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Accounting Office Manager';
  isMenuCollapsed = false;
  currentUser: User;
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    ) {}

    
  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  onLogout() {
    this.authService.logout();
  }
}
