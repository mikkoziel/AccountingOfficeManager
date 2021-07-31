import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Employee } from 'src/app/entity/employee';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  currentuser: User;
  employee_id: number;
  employee: Employee;
  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.currentuser = this.userService.getCurrentUser();
    this.route.queryParams.subscribe(params => {
      this.employee_id = params['id'];
    });
  }

}
