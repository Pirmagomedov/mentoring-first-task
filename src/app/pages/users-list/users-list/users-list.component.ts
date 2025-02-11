import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersApiService, IUser } from '../../../services/users-api.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../../components/user-card/user-card/user-card.component';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  apiService = inject(UsersApiService);
  usersService = inject(UsersService);
  users$: Observable<IUser[]> = this.usersService.users$;

  public onDelete(id: number) {
    this.usersService.deleteUser(id);
  }

  constructor() {
    this.apiService
      .getUsers()
      .subscribe((data) => this.usersService.setUsers(data));
  }
}
