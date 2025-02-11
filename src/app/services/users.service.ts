import { Injectable } from '@angular/core';
import { IUser } from './users-api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: IUser[] = [];
  users$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([])

  constructor() {
    this.users$.subscribe(data => {
      this.users = data
    })
  }

  public deleteUser(id: number) {
    this.users$.next(
      this.users$.value.filter(user => user.id !== id)
    )
  }

  public setUsers(data: IUser[]): void {
    this.users$.next(data)
  }
}
