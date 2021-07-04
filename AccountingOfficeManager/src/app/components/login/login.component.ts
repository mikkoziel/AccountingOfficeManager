import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServerService } from '../../services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true
  login: string = ""
  password: string = ""


  constructor(
    private router: Router,
    private authServer: AuthService
  ) { }

  ngOnInit(): void {
  }

  log_in(){
    this.authServer.login(this.login, this.password);
    // this.router.navigate(["/user-home"]);
  }

}
