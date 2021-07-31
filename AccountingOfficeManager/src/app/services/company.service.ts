import { Injectable } from '@angular/core';
import { ClientCompany } from '../entity/clientCompany';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private server: ServerService,
    ) { }

  parseClientCompany(data): ClientCompany{
      return <ClientCompany>{
        company_id: data["company_id"],
        name: data["name"],
      }
  }
}
