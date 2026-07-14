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
import { IncomeService } from '../../income.service';

export interface DialogData {
  incomeId: number;
  patientName: string;
  serviceType: string;
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-income-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
})
export class IncomeDeleteComponent {
  dialogRef = inject<MatDialogRef<IncomeDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  incomeService = inject(IncomeService);

  confirmDelete(): void {
    this.incomeService.deleteIncomeRecord(this.data.incomeId).subscribe({
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
