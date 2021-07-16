import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private server: ServerService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.email],
      first_name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    },);
  }

  onSubmit() {
    console.log('Submitting');
    if (!this.form.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    console.log('Form valid');
    const request = this.server.request('POST', '/register', {
      username: this.form.get('username').value,
      first_name: this.form.get('first_name').value,
      password: this.form.get('password').value
    });

    request.subscribe(() => {
      this.router.navigate(['/login']);
    })
  }

  // register(){
  //   this.router.navigate(["/login"]);
    
  // }

}
