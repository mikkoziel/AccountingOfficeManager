import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/entity/client';
import { User } from 'src/app/entity/user';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {
  currentUser: User;
  clients: Array<Client>;
  displayedColumns: string[] = ['first_name', 'last_name', 'username', 'company', 'info'];
  
  constructor(
    private userService: UserService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user =>{
      this.currentUser = user;
      this.clientService.getClientsForEmployee(this.currentUser.id).subscribe(res=>{
        console.log(res)
        this.clients = res;
      })
    })
  }

}
