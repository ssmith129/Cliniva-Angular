import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { RoomsByDepartmentService } from '../../rooms-by-department.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  room_id: number;
  room_number: string;
  department_name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-rooms-by-department-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
    ]
})
export class RoomsByDepartmentDeleteComponent {
  dialogRef = inject<MatDialogRef<RoomsByDepartmentDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  roomsByDepartmentService = inject(RoomsByDepartmentService);

  confirmDelete(): void {
    this.roomsByDepartmentService
      .deleteRoomFromDepartment(this.data.room_id)
      .subscribe({
        next: (response) => {
          this.dialogRef.close(response); // Close with the response data
          // Handle successful deletion, e.g., refresh the table or show a notification
        },
        error: (_error) => {
          // Handle the error appropriately
        },
      });
  }
}
