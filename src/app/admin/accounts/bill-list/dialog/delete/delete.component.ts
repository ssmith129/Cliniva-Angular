import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { BillListService } from '../../bill-list.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  patientName: string;
  doctorName: string;
  total: string;
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-bill-list-delete',
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
export class BillListDeleteComponent {
  dialogRef = inject<MatDialogRef<BillListDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  billListService = inject(BillListService);

  confirmDelete(): void {
    this.billListService.deleteBillList(this.data.id).subscribe({
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
