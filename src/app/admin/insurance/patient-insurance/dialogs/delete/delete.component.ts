import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { PatientInsuranceService } from '../../patient-insurance.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  insurance_id: string;
  patient_id: string;
  insurance_company_name: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-all-patient-insurance-delete',
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
export class PatientInsuranceDeleteComponent {
  dialogRef = inject<MatDialogRef<PatientInsuranceDeleteComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  patientInsuranceService = inject(PatientInsuranceService);

  confirmDelete(): void {
    this.patientInsuranceService
      .deletePatientInsurance(this.data.insurance_id)
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
