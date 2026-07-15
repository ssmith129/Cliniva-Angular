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
import { PatientRecordsService } from '../../patient-records.service';

export interface DialogData {
  patientId: number;
  fullName: string;
  dateOfAdmission: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-all-patient-records-delete',
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
export class AllPatientDeleteComponent {
  dialogRef = inject<MatDialogRef<AllPatientDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  patientRecordsService = inject(PatientRecordsService);

  confirmDelete(): void {
    this.patientRecordsService
      .deletePatientRecord(this.data.patientId)
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
