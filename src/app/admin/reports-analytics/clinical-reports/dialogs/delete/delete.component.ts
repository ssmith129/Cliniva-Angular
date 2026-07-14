import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { ClinicalReportsService } from '../../clinical-reports.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  patientName: string;
  visitDate: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-clinical-report-delete',
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
export class ClinicalReportDeleteComponent {
  dialogRef = inject<MatDialogRef<ClinicalReportDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  clinicalReportsService = inject(ClinicalReportsService);


  confirmDelete(): void {
    this.clinicalReportsService.deleteClinicalReport(this.data.id).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (_error) => {
      },
    });
  }
}
