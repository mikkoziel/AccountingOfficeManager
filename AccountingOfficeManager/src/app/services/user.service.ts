import { Injectable } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { User } from '../entity/user';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Parser } from '../utils/parser';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private server: ServerService,
    private parser: Parser
  ) { }

  getCurrentUser(): Observable<User>{
    return this.server.currentUser;
  }

  getUserById(id: number): Observable<User>{
    return this.server.request('GET', '/user/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res: Response) => {
        return this.parser.parseUser(res);
      })
    );
  }

  changePassword(data){
    return this.server.request(
      'POST', 
      '/user/updatePassword',
      data
    )
  }

  registerUserAndAO(data){
    return this.server.request('POST', '/ao/register', {
      ao:{
        name: data["ao_name"]
      },
      employee:{
        username: data['username'],
        first_name: data['first_name'],
        last_name: data['last_name'],
        password: data['password'],
        roles:[
          {role_id:4}
        ]
      }
    })
  }

  registerEmployee(data){
    return this.server.request('POST', '/employee/', {
      username: data['username'],
      first_name: data['first_name'],
      last_name: data['last_name'],
      password: data['password'],
      admin:{
        user_id: data["admin_id"]
      },
      roles:[
        {role_id:2}
      ]
    })
  }

  assignClient(data){
    return this.server.request('POST','/client/employee/', {
      employee_id: data["employee_id"],
      client_id: data["client_id"]
    })
  }

  changeRole(data){
    return this.server.request('POST', '/user/updateRole/' + data['user_id'],{
      role_id: data['role_id']
    })
  }

  getParticipants(id){
    return this.server.request('GET', '/user/part/' + id)
    .pipe(
      // tap((res)=>{console.log(res)}),
      map((res)=>{
        return this.parser.parseUserArray(res)
      })
    )
  }

}
