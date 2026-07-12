import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { LabAnalyticsReportsService } from '../../lab-reports.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData { id: number; patientName: string; testName: string; }

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lab-report-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
})
export class LabReportDeleteComponent {
  dialogRef = inject<MatDialogRef<LabReportDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  labReportsService = inject(LabAnalyticsReportsService);

  confirmDelete(): void {
    this.labReportsService.deleteLabReport(this.data.id).subscribe({
      next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
    });
  }
}
