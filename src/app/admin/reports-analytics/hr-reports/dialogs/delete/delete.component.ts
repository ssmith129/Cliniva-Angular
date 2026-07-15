import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { HrReportsService } from '../../hr-reports.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  employeeName: string;
  department: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hr-report-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
})
export class HrReportDeleteComponent {
  dialogRef = inject<MatDialogRef<HrReportDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  hrReportsService = inject(HrReportsService);

  confirmDelete(): void {
    this.hrReportsService.deleteHrReport(this.data.id).subscribe({
      next: (response) => { this.dialogRef.close(response); },
      error: (_error) => {},
    });
  }
}
