import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-cc',
  templateUrl: './register-cc.component.html',
  styleUrls: ['./register-cc.component.css']
})
export class RegisterCcComponent implements OnInit {
  hide: boolean = true;
  form: FormGroup;
  currentUser: User;

  spinnerFlag = 0;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
    })
    this.form = this.fb.group({
      name: ['', Validators.required],
    },);
  }

  async onSubmit() {
    this.spinnerFlag += 1;
    console.log('Submitting');
    if (!this.form.valid) {
      console.log('Form not valid. Please check that fields are correctly filled in');
      this.spinnerFlag -= 1;
      return;
    }

    const request = this.companyService.registerCC({
      name: this.form.get('name').value,
      id: this.currentUser.id
    })
    
    request.subscribe(() => {
      // this.router.navigate(['/login']);
      this.spinnerFlag -= 1;
    })
  }

}
