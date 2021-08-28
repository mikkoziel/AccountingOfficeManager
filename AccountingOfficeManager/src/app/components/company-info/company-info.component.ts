import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/entity/client';
import { Company } from 'src/app/entity/company';
import { User } from 'src/app/entity/user';
import { ClientService } from 'src/app/services/client.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  currentUser: User;
  company_id: number;
  company: Company;

  dataSource;
  displayedColumns: string[] = ['name', 'value'];
  
  clients: Array<Client>;
  clientDisplayedColumns: string[] = ['first_name', 'last_name', 'username', 'company', 'info'];
  

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private clientService: ClientService
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
    })
    this.route.params.subscribe(params => {
      this.company_id = params['id'];
      console.log(this.company_id)
      this.companyService.getCompany(this.company_id).subscribe(res=>{
        this.company = res;
        this.dataSource = Object.entries(this.company);
        this.dataSource.splice(2,1);
        this.clientService.getClientsForCompany(this.company.company_id).subscribe(res=>{
          this.clients = res;
        })
      })
    });

  }

}
