import { Component, OnInit } from '@angular/core';
import { ClientCompany } from 'src/app/entity/clientCompany';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {
  clients: Array<ClientCompany>

  constructor(
    private serverService: ServerService
  ) { }

  ngOnInit(): void {
    this.clients = this.serverService.getClients()
  }

}
