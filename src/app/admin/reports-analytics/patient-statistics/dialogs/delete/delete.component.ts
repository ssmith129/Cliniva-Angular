import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { PatientStatisticsService } from '../../patient-statistics.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData { id: number; patientName: string; diagnosis: string; }

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-statistic-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatDialogClose],
})
export class PatientStatisticDeleteComponent {
  dialogRef = inject<MatDialogRef<PatientStatisticDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  patientStatisticsService = inject(PatientStatisticsService);

  confirmDelete(): void {
    this.patientStatisticsService.deletePatientStatistic(this.data.id).subscribe({
      next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
    });
  }
}
