import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  public readonly api: HttpClient = inject(HttpClient);

  public getUsers(): Observable<IUser[]> {
    return this.api.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
  }
}
