import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/entity/client';
import { Company } from 'src/app/entity/company';
import { User } from 'src/app/entity/user';
import { ClientService } from 'src/app/services/client.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';
import { AddClientComponent } from '../add-client/add-client.component';

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
  
  spinnerFlag = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private clientService: ClientService,
    private dialog: MatDialog,
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
        this.spinnerFlag += 1;
      })
      this.clientService.getClientsForCompany(this.company_id).subscribe(res=>{
        this.clients = res;
        this.spinnerFlag += 1;
      })
    });
  }

  addNewClient(){
    let dialogRef = this.dialog.open(AddClientComponent, {
      height: '400px',
      width: '600px',
      data: {'company_id': this.company_id}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
