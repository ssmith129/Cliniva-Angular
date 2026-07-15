import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { ClaimStatusService } from '../../claim-status.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClaimStatus } from '../../claim-status.model';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

export interface DialogData {
  id: number;
  action: string;
  claimStatus: ClaimStatus;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-all-claim-status-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatDialogClose,
    ]
})
export class AllClaimStatusFormComponent {
  dialogRef = inject<MatDialogRef<AllClaimStatusFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  claimStatusService = inject(ClaimStatusService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  claimStatusForm: FormGroup;
  claimStatus: ClaimStatus;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle =
      this.action === 'edit' ? data.claimStatus.patient_name : 'New Patient';
    this.claimStatus =
      this.action === 'edit' ? data.claimStatus : new ClaimStatus({}); // Create a blank object
    this.claimStatusForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      claim_id: [this.claimStatus.claim_id, [Validators.required]],
      patient_name: [this.claimStatus.patient_name, [Validators.required]],
      claim_type: [this.claimStatus.claim_type, [Validators.required]],
      doctor_name: [this.claimStatus.doctor_name, [Validators.required]],
      hospital_name: [this.claimStatus.hospital_name, [Validators.required]],
      amount: [
        this.claimStatus.amount,
        [Validators.required, Validators.min(0)],
      ],
      approved_amount: [
        this.claimStatus.approved_amount,
        [Validators.required, Validators.min(0)],
      ],
      status: [this.claimStatus.status, [Validators.required]],
      claim_date: [this.claimStatus.claim_date, [Validators.required]],
      rejection_reason: [this.claimStatus.rejection_reason], // Optional field
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    } else if (control.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  submit() {
    if (this.claimStatusForm.valid) {
      if (this.action === 'edit') {
        // Update existing doctor
        this.claimStatusService
          .updateClaimStatus(this.claimStatusForm.getRawValue())
          .subscribe({
            next: (response) => {
              this.dialogRef.close(response); // Close dialog and return updated doctor data
            },
            error: (_error) => {
              // Optionally display an error message to the user
            },
          });
      } else {
        // Add new doctor
        this.claimStatusService
          .addClaimStatus(this.claimStatusForm.getRawValue())
          .subscribe({
            next: (response) => {
              this.dialogRef.close(response); // Close dialog and return newly added doctor data
            },
            error: (_error) => {
              // Optionally display an error message to the user
            },
          });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without any action
  }
}
