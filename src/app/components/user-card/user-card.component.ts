import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../services/users-api.service';

@Component({
  selector: 'user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: IUser;
  @Output() onDelete = new EventEmitter;
}
