import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { FinancialReportsService } from '../../financial-reports.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  description: string;
  amount: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-financial-report-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ]
})
export class FinancialReportDeleteComponent {
  dialogRef = inject<MatDialogRef<FinancialReportDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  financialReportsService = inject(FinancialReportsService);


  confirmDelete(): void {
    this.financialReportsService.deleteFinancialReport(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
