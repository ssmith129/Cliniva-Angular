import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BloodIssued } from '../../blood-issued.model';
import { BloodIssuedService } from '../../blood-issued.service';

export interface DialogData {
  id: number;
  action: string;
  bloodIssued: BloodIssued;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-all-blood-issued-form-dialog',
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
        MatDialogClose
    ]
})
export class BloodIssuedFormComponent {
  dialogRef = inject<MatDialogRef<BloodIssuedFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  bloodIssuedService = inject(BloodIssuedService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  bloodIssuedForm: FormGroup;
  bloodIssued: BloodIssued;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle =
      this.action === 'edit' ? data.bloodIssued.patientName : 'New Patient';
    this.bloodIssued =
      this.action === 'edit' ? data.bloodIssued : new BloodIssued({}); // Create a blank object
    this.bloodIssuedForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      issueId: [this.bloodIssued.issueId, [Validators.required]],
      patientId: [this.bloodIssued.patientId, [Validators.required]],
      patientName: [this.bloodIssued.patientName, [Validators.required]],
      patientAge: [this.bloodIssued.patientAge, [Validators.required]],
      patientGender: [this.bloodIssued.patientGender, [Validators.required]],
      bloodProductId: [this.bloodIssued.bloodProductId, [Validators.required]],
      bloodType: [this.bloodIssued.bloodType, [Validators.required]],
      componentType: [this.bloodIssued.componentType, [Validators.required]],
      quantityIssued: [this.bloodIssued.quantityIssued, [Validators.required]],
      issueDate: [this.bloodIssued.issueDate, [Validators.required]],
      batchNumber: [this.bloodIssued.batchNumber, [Validators.required]],
      issuedBy: [this.bloodIssued.issuedBy, [Validators.required]],
      issueReason: [this.bloodIssued.issueReason, [Validators.required]],
      patientBloodGroup: [
        this.bloodIssued.patientBloodGroup,
        [Validators.required],
      ],
      doctorId: [this.bloodIssued.doctorId, [Validators.required]],
      doctorName: [this.bloodIssued.doctorName, [Validators.required]],
      unitOfMeasure: [this.bloodIssued.unitOfMeasure],
      bloodStatus: [this.bloodIssued.bloodStatus],
      bloodTransfusionDate: [this.bloodIssued.bloodTransfusionDate],
      remarks: [this.bloodIssued.remarks],
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
    if (this.bloodIssuedForm.valid) {
      if (this.action === 'edit') {
        // Update existing doctor
        this.bloodIssuedService
          .updateBloodIssued(this.bloodIssuedForm.getRawValue())
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
        this.bloodIssuedService
          .addBloodIssued(this.bloodIssuedForm.getRawValue())
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
