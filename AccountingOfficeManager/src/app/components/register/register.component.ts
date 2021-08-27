import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.email],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      ao_name: ['', Validators.required],
    },);
  }

  async onSubmit() {
    console.log('Submitting');
    if (!this.form.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      return;
    }

    const request = this.userService.registerUserAndAO({
      username: this.form.get('username').value,
      first_name: this.form.get('first_name').value,
      last_name: this.form.get('last_name').value,
      password: this.form.get('password').value,
      ao_name: this.form.get('ao_name').value
    })
    
    request.subscribe(() => {
      this.router.navigate(['/login']);
    })
  }

    // console.log('Form valid');
    // const ao_request = this.server.request('POST', '/ao', {
    //   name: this.form.get('ao_name').value
    // })

    // ao_request.subscribe(()=>{
    //   const register_request = this.server.request('POST', '/register', {
    //     username: this.form.get('username').value,
    //     first_name: this.form.get('first_name').value,
    //     last_name: this.form.get('last_name').value,
    //     password: this.form.get('password').value,
    //     company: {
          
    //     }
    //   });
  
    //   register_request.subscribe(() => {
    //   })
    // })
 
  // }

  // register(){
  //   this.router.navigate(["/login"]);
    
  // }

}
