import { Component, OnInit } from '@angular/core';
import { ClientCompany } from 'src/app/entity/clientCompany';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {
  clients: Array<ClientCompany>

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // this.clients = this.userService.getClients()
  }

}
