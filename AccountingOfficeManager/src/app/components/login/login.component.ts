import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  
  spinnerFlag = 0;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async onSubmit() {
    this.spinnerFlag = 1
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        await this.authService.login(this.form.value);
      } catch (err) {
        this.loginInvalid = true;
        this.spinnerFlag = 0
      }
    } else {
      this.formSubmitAttempt = true;
      this.spinnerFlag = 0
    } 
  }

}
