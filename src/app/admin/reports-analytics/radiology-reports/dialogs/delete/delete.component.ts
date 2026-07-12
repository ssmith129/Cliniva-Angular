import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { RadiologyReportsService } from '../../radiology-reports.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData { id: number; patientName: string; scanType: string; }

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-radiology-report-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
})
export class RadiologyReportDeleteComponent {
  dialogRef = inject<MatDialogRef<RadiologyReportDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  radiologyReportsService = inject(RadiologyReportsService);

  confirmDelete(): void {
    this.radiologyReportsService.deleteRadiologyReport(this.data.id).subscribe({
      next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
    });
  }
}
