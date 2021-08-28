import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entity/user';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';
import { CompanyInfoComponent } from '../company-info/company-info.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  hide: boolean = true;
  form: FormGroup;
  currentUser: User;

  constructor(
    public dialogRef: MatDialogRef<AddClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyInfoComponent,
    private fb: FormBuilder, 
    private userService: UserService,
    private clientService: ClientService,
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
    })
    this.form = this.fb.group({
      username: ['', Validators.email],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
    console.log(this.data)
  }

  async onSubmit(){
    await this.clientService.registerClient({
      username: this.form.value["username"],
      first_name: this.form.value["first_name"],
      last_name: this.form.value["last_name"],
      password: this.form.value["password"],
      company_id: this.data["company_id"],
      employee_id: this.currentUser.id
    }
    ).subscribe(x=>{
      console.log(x)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
