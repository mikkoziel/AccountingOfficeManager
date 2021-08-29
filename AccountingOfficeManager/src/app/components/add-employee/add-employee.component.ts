import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';
import { EmployeesManagementComponent } from '../employees-management/employees-management.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  hide: boolean = true;
  form: FormGroup;
  currentUser: User;

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeesManagementComponent,
    private fb: FormBuilder, 
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      
      console.log(this.currentUser)
    })
    this.form = this.fb.group({
      username: ['', Validators.email],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  async onSubmit(){
    await this.userService.registerEmployee({
      username: this.form.value["username"],
      first_name: this.form.value["first_name"],
      last_name: this.form.value["last_name"],
      password: this.form.value["password"],
      // company_id: this.currentUser.company.company_id,
      admin_id: this.currentUser.id
    }
    ).subscribe(x=>{
      console.log(x)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
