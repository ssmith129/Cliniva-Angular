import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { LeavesService } from '../leaves.service';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  from: string;
  type: string;
  name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-leave-request-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
        DatePipe,
    ]
})
export class LeaveRequestDeleteComponent {
  dialogRef = inject<MatDialogRef<LeaveRequestDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  leavesService = inject(LeavesService);

  confirmDelete(): void {
    this.leavesService.deleteLeaves(this.data.id).subscribe({
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
