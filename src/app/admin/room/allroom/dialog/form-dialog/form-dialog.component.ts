import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { RoomService } from '../../room.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Room } from '../../room.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  id: number;
  action: string;
  room: Room;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-all-room-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatDatepickerModule,
        MatDialogClose,
    ]
})
export class AllRoomFormComponent {
  dialogRef = inject<MatDialogRef<AllRoomFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  roomService = inject(RoomService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  roomForm: FormGroup;
  room: Room;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle =
      this.action === 'edit' ? `Edit Room: ${data.room.roomNo}` : 'New Room';
    this.room = this.action === 'edit' ? data.room : new Room({} as Room);
    this.roomForm = this.createRoomForm();
  }

  // Create form group for room details
  createRoomForm(): FormGroup {
    return this.fb.group({
      id: [this.room.id],
      img: [this.room.img],
      patientName: [this.room.patientName],
      roomNo: [this.room.roomNo, [Validators.required]],
      bedNo: [this.room.bedNo, [Validators.required]],
      roomType: [this.room.roomType, [Validators.required]],
      gender: [this.room.gender, [Validators.required]],
      admitDate: [this.room.admitDate, [Validators.required]],
      dischargeDate: [this.room.dischargeDate],
      doctorAssigned: [this.room.doctorAssigned],
      status: [this.room.status],
      amountCharged: [this.room.amountCharged, [Validators.required]],
      age: [this.room.age, [Validators.required]],
      mobile: [this.room.mobile, [Validators.required]],
      email: [this.room.email, [Validators.email]],
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    } else if (control.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  // Submit form data
  submit() {
    if (this.roomForm.valid) {
      const roomData = this.roomForm.getRawValue();
      if (this.action === 'edit') {
        this.roomService.updateRoom(roomData).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
            // Optionally display an error message to the user
          },
        });
      } else {
        this.roomService.addRoom(roomData).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
            // Optionally display an error message to the user
          },
        });
      }
    }
  }

  // Close dialog without action
  onNoClick(): void {
    this.dialogRef.close();
  }
}
