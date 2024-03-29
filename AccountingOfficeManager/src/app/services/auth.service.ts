import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ServerService } from './server.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private token: string;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router, 
    private server: ServerService,
    private userService: UserService
    ) {
      // console.log('Auth Service');
      const userData = localStorage.getItem('user');
      if (userData) {
        console.log('Logged in from memory');
        const user = JSON.parse(userData);
        this.token = user.token;
        this.server.setLoggedIn(true, this.token);
        this.loggedIn.next(true);
    }
  }

  login(user) {
    if (user.username !== '' && user.password !== '' ) {
      return this.server.request('POST', '/auth/login', {
        username: user.username,
        password: user.password
      }).subscribe((response: any) => {
        if (response.headers.get('Authorization') !== undefined) {
          
          this.token = response.headers.get('Authorization');
          this.server.setLoggedIn(true, this.token);
          this.loggedIn.next(true);
          const userData = {
            token: this.token,
          };
          localStorage.setItem('user', JSON.stringify(userData));  

          this.server.currentUser.next(this.userService.parseUser(response.body))
          // console.log(this.server.currentUser)
          this.router.navigateByUrl('/user-home');
        }
      });
    }
  }

  logout() {
    this.server.setLoggedIn(false);
    delete this.token;

    this.loggedIn.next(false);
    this.server.currentUser.next(null);
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
