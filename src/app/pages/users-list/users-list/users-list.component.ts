import { Component, inject } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { UsersApiService, IUser } from '../../../services/users-api.service';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../../components/user-card/user-card.component';
import { UsersService } from '../../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserModalComponent } from '../../../components/create-user-modal/create-user-modal/create-user-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from '../../../components/confirm/confirm/confirm.component';

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  apiService = inject(UsersApiService);
  usersService = inject(UsersService);
  users$: Observable<IUser[]> = this.usersService.users$;
  dialog = inject(MatDialog);

  constructor() {
    const cache = localStorage.getItem("users")
    cache ? this.usersService.setUsers(JSON.parse(cache))
    :
    this.apiService
      .getUsers()
      .subscribe((data) => {
        localStorage.setItem("users", JSON.stringify(data))
        this.usersService.setUsers(data)
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateUserModalComponent, {
      data: {
        isEdit: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.usersService.addUser(result);
    });
  }

  public onEdit(user: IUser) {
    const dialogRef = this.dialog.open(CreateUserModalComponent, {
      data: {
        user,
        isEdit: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.usersService.editUser(result);
    });
  }

  public onDelete([id, event]: [number, Event]) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        user: this.usersService.users.find(user => user.id === id)
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.usersService.deleteUser(id);
    });
  }
}
