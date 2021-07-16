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

  getUserById(id: number): Observable<User>{
    return this.server.request('GET', '/user/' + id)
    .pipe(
      tap((res:Response) => console.log(res)),
      map((res: Response) => {
        return <User>{
          id: res['user_id'],
          first_name: res['first_name'],
          last_name: res['last_name'],
          username: res['username'],
          type: "Admin"
        }
      })
    );
  }
}
