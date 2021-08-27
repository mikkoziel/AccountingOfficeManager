import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { User } from '../entity/user';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Roles } from '../entity/role';
import { getRole } from '../utils/utils';
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

  parseAO(data): AO{
    return <AO>{
      company_id: data["company_id"],
      name: data["name"],
    }
}
}
