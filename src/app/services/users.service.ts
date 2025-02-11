import { Injectable } from '@angular/core';
import { IUser } from './users-api.service';
import { BehaviorSubject, Observable, skip } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: IUser[] = [];
  users$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  constructor() {
    this.users$
    .pipe(skip(1))
    .subscribe((data) => {
      localStorage.setItem("users", JSON.stringify(data))
      this.users = data;
    });
  }

  public addUser(user: IUser): void {
    this.users$.next(
      this.users$.value.concat({
        ...user,
        id: this.users$.value.sort((a,b) => a.id-b.id).slice(-1)[0].id + 1,
      })
    );
  }

  public editUser(editedUser: IUser): void {
    this.users$.next(
      this.users$.value.map((user) =>
        editedUser.id === user.id ? editedUser : user
      )
    );
  }

  public deleteUser(id: number): void {
    this.users$.next(this.users$.value.filter((user) => user.id !== id));
  }

  public setUsers(data: IUser[]): void {
    this.users$.next(data);
  }
}
