import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Auth } from './models/auth.motel';

@Injectable({
  providedIn: 'root',
})
export class AuthClientService {
  login(username: string, password: string): Observable<Auth> {
    return of({
      userId: '3671bb32-d348-440c-9647-614461cea878',
      userName: 'Admin Admin',
    } as Auth).pipe(
      tap((_) => {
        if (username != 'cat' || password != 'cat') {
          throw Error('Incorrect username or password');
        }
      })
    );
  }
}
