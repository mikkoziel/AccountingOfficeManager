import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { User } from '../entity/user';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Roles } from '../entity/role';
import { findInDictAfterCirc, getRole } from '../utils/utils';
import { AO } from '../entity/ao';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router, 
    private server: ServerService,
  ) { }

  getCurrentUser(): Observable<User>{
    return this.server.currentUser;
  }

  getUserById(id: number): Observable<User>{
    return this.server.request('GET', '/user/' + id)
    .pipe(
      // tap((res:Response) => console.log(res)),
      map((res: Response) => {
        return this.parseUser(res);
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
        return this.parseUserArray(res)
      })
    )
  }

  // PARSERS ---------------------------------------------------
  parseUserArray(data){
    var users = new Array<User>();
    data.forEach(x=>{
      let user = this.checkUser(data, x);
      users.push(this.parseUser(user))
    });
    return users;
  }

  checkUser(data, user){
    if(user.constructor == Object){
      // console.log("Object return user")
      return user
    } else {
      // console.log("Nope look for user")
      return findInDictAfterCirc(data, "user_id", user)
    }
  }

  parseUser(data): User{
    let role_check = getRole(data["roles"])
      return <User>{
        id: data['user_id'],
        first_name: data['first_name'],
        last_name: data['last_name'],
        username: data['username'],
        role: role_check
      }   
  }

  find(array, string) {
    return array.reduce((r, o) => {
        if (Object.values(o).some(v => v === string)) {
            r.push(o);
            return r;
        }
        if (Array.isArray(o.subNames)) {
            var subNames = this.find(o.subNames, string);
            if (subNames.length) r.push(Object.assign({}, o, { subNames }));
        }
        return r;
    }, []);
  }

  parseAO(data): AO{
    return <AO>{
      company_id: data["company_id"],
      name: data["name"],
    }
  }
}
