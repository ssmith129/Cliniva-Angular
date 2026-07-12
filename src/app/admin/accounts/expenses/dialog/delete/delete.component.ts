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
import { ExpensesService } from '../../expenses.service';

export interface DialogData {
  expense_id: number;
  category: string;
  amount: string;
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-expenses-delete',
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
export class ExpensesDeleteComponent {
  dialogRef = inject<MatDialogRef<ExpensesDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  expensesService = inject(ExpensesService);

  confirmDelete(): void {
    this.expensesService.deleteExpensesRecord(this.data.expense_id).subscribe({
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
