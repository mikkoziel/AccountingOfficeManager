import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/entity/employee';
import { User } from 'src/app/entity/user';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employees-management',
  templateUrl: './employees-management.component.html',
  styleUrls: ['./employees-management.component.css']
})
export class EmployeesManagementComponent implements OnInit {
  currentUser: User;
  employees: Array<Employee>;
  displayedColumns: string[] = ['first_name', 'last_name', 'username', 'company', 'info'];

  constructor(
    private userService: UserService,
    private eService: EmployeeService
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      this.eService.getEmployeesForAdmin(this.currentUser.id).subscribe(res=>{
        // console.log(res)
        this.employees = res;
      })
    })
  }

}
