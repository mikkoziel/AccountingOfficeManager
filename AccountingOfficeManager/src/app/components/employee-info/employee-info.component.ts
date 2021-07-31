import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Employee } from 'src/app/entity/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Client } from 'src/app/entity/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  currentuser: User;
  employee_id: number;
  employee: Employee;

  dataSource;
  displayedColumns: string[] = ['name', 'value'];
  clients: Array<Client>;
  clientDisplayedColumns: string[] = ['first_name', 'last_name', 'username', 'company'];
  
  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private eService: EmployeeService,
    private clientService: ClientService
    ) { }

  ngOnInit(): void {
    this.currentuser = this.userService.getCurrentUser();
    this.route.params.subscribe(params => {
      this.employee_id = params['id'];
      this.eService.getEmployee(this.employee_id).subscribe(res=>{
        this.employee = res;
        this.dataSource = Object.entries(this.employee);
        this.dataSource.splice(2,1);
        console.log(this.dataSource)
        this.clientService.getClientsForEmployee(this.employee.id).subscribe(res=>{
          console.log(res)
          this.clients = res;
          console.log(this.clients);
        })
      })
    });
  }

}
