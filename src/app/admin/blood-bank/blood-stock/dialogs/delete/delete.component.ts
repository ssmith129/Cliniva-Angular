import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BloodStockService } from '../../blood-stock.service';

export interface DialogData {
  bloodProductID: number;
  bloodType: string;
  quantityInStock: number;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-all-blood-stock-delete',
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
export class BloodStockDeleteComponent {
  dialogRef = inject<MatDialogRef<BloodStockDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  bloodStockService = inject(BloodStockService);

  confirmDelete(): void {
    this.bloodStockService
      .deleteBloodStock(this.data.bloodProductID)
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
