import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Employee } from 'src/app/entity/employee';
import { User } from 'src/app/entity/user';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employees-management',
  templateUrl: './employees-management.component.html',
  styleUrls: ['./employees-management.component.css']
})
export class EmployeesManagementComponent implements OnInit, AfterViewInit {
  currentUser: User;
  employees: Array<Employee>;
  displayedColumns: string[] = ['first_name', 'last_name', 'username', 'company', 'info'];
  dataSource;

  spinnerFlag = 0;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private eService: EmployeeService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      this.eService.getEmployeesForAdmin(this.currentUser.id).subscribe(res=>{
        // console.log(res)
        this.employees = res;
        this.dataSource = Object.entries(this.employees);
        this.spinnerFlag += 1;
      })
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  addNewEmployee(){
    let dialogRef = this.dialog.open(AddEmployeeComponent, {
      height: '400px',
      width: '600px',
      // data: {'company_id': this.company_id}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
