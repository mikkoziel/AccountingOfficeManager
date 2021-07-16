import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Accounting Office Manager';
  isMenuCollapsed = false;
  
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
