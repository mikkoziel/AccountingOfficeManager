import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/entity/client';
import { User } from 'src/app/entity/user';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
  currentuser: User;
  client_id: number;
  client: Client;

  dataSource;
  displayedColumns: string[] = ['name', 'value'];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private clientService: ClientService
    ) { }

  ngOnInit(): void {
    this.currentuser = this.userService.getCurrentUser();
    this.route.params.subscribe(params => {
      this.client_id = params['id'];
      this.clientService.getClient(this.client_id).subscribe(res =>{
        this.client = res;
        this.dataSource = Object.entries({
          ID: this.client.id,
          FirstName: this.client.first_name,
          LastName: this.client.last_name,
          Username: this.client.username,
          Company: this.client.company.name,
          Employee: this.client.employee_id,
          Role: this.client.role
        });
      })
    })
  }

}
