import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Notification } from '../../notifications.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  notification: Notification;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-notification-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogClose
],
})
export class NotificationFormComponent {
  dialogRef = inject<MatDialogRef<NotificationFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  notificationForm: FormGroup;
  notification: Notification;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.notification.title;
      this.notification = data.notification;
    } else {
      this.dialogTitle = 'New Notification';
      const blankObject = {} as Notification;
      this.notification = new NotificationClass(blankObject);
    }
    this.notificationForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.notification.id],
      title: [this.notification.title, [Validators.required]],
      message: [this.notification.message, [Validators.required]],
      type: [this.notification.type, [Validators.required]],
      date: [this.notification.date, [Validators.required]],
      time: [this.notification.time, [Validators.required]],
      status: [this.notification.status, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.notificationForm.valid) {
      this.dialogRef.close(this.notificationForm.getRawValue());
    }
  }
}

export class NotificationClass {
  id: number;
  title: string;
  message: string;
  type: string;
  date: string;
  time: string;
  status: string;

  constructor(notification: Notification) {
    this.id = notification.id || 0;
    this.title = notification.title || '';
    this.message = notification.message || '';
    this.type = notification.type || 'Info';
    this.date = notification.date || '';
    this.time = notification.time || '';
    this.status = notification.status || 'Unread';
  }
}
