import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { User } from '../entity/user';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router, 
    private server: ServerService,
  ) { }

  getCurrentUser(): User{
    return this.server.currentUser;
  }

  getUserById(id: number): Observable<User>{
    return this.server.request('GET', '/user/' + id)
    .pipe(
      tap((res:Response) => console.log(res)),
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
    return <User>{
      id: data['user_id'],
      first_name: data['first_name'],
      last_name: data['last_name'],
      username: data['username'],
      role: data["roles"][0]['name']
    }
  }
}
