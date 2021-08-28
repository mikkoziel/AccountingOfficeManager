import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Employee } from 'src/app/entity/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Client } from 'src/app/entity/client';
import { ClientService } from 'src/app/services/client.service';
import { Roles } from 'src/app/entity/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getRoleByString } from 'src/app/utils/utils';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  currentUser: User;
  employee_id: number;
  employee: Employee;

  dataSource;
  displayedColumns: string[] = ['name', 'value'];
  
  clients: Array<Client>;
  clientDisplayedColumns: string[] = ['first_name', 'last_name', 'username', 'company', 'info'];
  
  employees: Array<Employee>;
  employeeDisplayedColumns: string[] = ['first_name', 'last_name', 'username', 'info'];
  
  form: FormGroup;
  selected;
  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private eService: EmployeeService,
    private clientService: ClientService,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
    })
    this.route.params.subscribe(params => {
      this.employee_id = params['id'];
      this.eService.getEmployee(this.employee_id).subscribe(res=>{
        this.employee = res;
        // this.form = this.fb.group({
        //   role: [this.employee.role, Validators.required],
        // })
        this.selected = getRoleByString(Roles, this.employee.role);
        console.log(this.selected)
        this.dataSource = Object.entries(this.employee);
        this.dataSource.splice(2,1);
        this.clientService.getClientsForEmployee(this.employee.id).subscribe(res=>{
          this.clients = res;
        })
        this.eService.getEmployeesForAdmin(this.employee.id).subscribe(res=>{
          this.employees = res;
        })
      })
    });
  }

  changeRole(){
    console.log(this.selected)
    console.log(getRoleByString(Roles, this.selected))
    // this.userService.changeRole({
    //   user_id: this.employee.id,
    //   role_id: this.form.get('role').value
    // })

  }
}
