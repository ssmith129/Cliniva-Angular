import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { BreakdownReportingService } from '../../breakdown-reporting.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  breakdown_id: string;
  equipment_name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-breakdown-reporting-delete',
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
export class BreakdownReportingDeleteComponent {
  dialogRef = inject<MatDialogRef<BreakdownReportingDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  breakdownReportingService = inject(BreakdownReportingService);


  confirmDelete(): void {
    this.breakdownReportingService.deleteReport(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
