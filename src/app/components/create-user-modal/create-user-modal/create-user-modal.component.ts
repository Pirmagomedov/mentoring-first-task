import {
  Component,
  EventEmitter,
  Inject,
  inject,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { IUser } from '../../../services/users-api.service';

@Component({
  selector: 'app-create-user-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    ReactiveFormsModule,
  ],
  templateUrl: './create-user-modal.component.html',
  styleUrl: './create-user-modal.component.scss',
})
export class CreateUserModalComponent {
  readonly dialogRef = inject(MatDialogRef<CreateUserModalComponent>);
  dialog = inject(MatDialog);
  reactiveForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: { user: IUser; isEdit: boolean }
  ) {
    this.reactiveForm = new FormGroup({
      name: new FormControl(data?.user?.name, Validators.required),
      username: new FormControl(data?.user?.username, Validators.required),
      email: new FormControl(data?.user?.email, Validators.required),
      phone: new FormControl(data?.user?.phone, Validators.required),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.reactiveForm.valid &&
    this.dialogRef.close({
      id: this.data?.user?.id,
      ...this.reactiveForm.value,
    });
  }
}
