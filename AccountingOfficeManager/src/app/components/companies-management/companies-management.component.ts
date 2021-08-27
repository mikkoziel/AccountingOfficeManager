import { Component, OnInit } from '@angular/core';
import { ClientCompany } from 'src/app/entity/clientCompany';
import { User } from 'src/app/entity/user';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-companies-management',
  templateUrl: './companies-management.component.html',
  styleUrls: ['./companies-management.component.css']
})
export class CompaniesManagementComponent implements OnInit {
  currentUser: User;
  clients: Array<ClientCompany>;
  displayedColumns: string[] = ['name', 'info'];
  
  constructor(
  private userService: UserService,
  private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      this.companyService.getCCForAO(this.currentUser.company.company_id).subscribe(res=>{
        console.log(res)
        this.clients = res;
      })
    })
  }

}
