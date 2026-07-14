import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { PatientService } from '../../patient.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Patient } from '../../patient.model';
import { formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

export interface DialogData {
  id: number;
  action: string;
  patient: Patient;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-all-patients-form-dialog',
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
        MatRadioModule,
        MatDatepickerModule,
        MatDialogClose,
    ]
})
export class AllPatientFormDialogComponent {
  dialogRef = inject<MatDialogRef<AllPatientFormDialogComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  patientService = inject(PatientService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  patientForm: FormGroup;
  patient: Patient;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle =
      this.action === 'edit' ? `Edit ${data.patient.name}` : 'New Patient';
    this.patient = this.action === 'edit' ? data.patient : new Patient({});
    this.patientForm = this.createPatientForm();
  }

  createPatientForm(): FormGroup {
    return this.fb.group({
      id: [this.patient.id],
      img: [this.patient.img],
      name: [this.patient.name, [Validators.required]],
      gender: [this.patient.gender],
      bGroup: [this.patient.bGroup],
      mobile: [this.patient.mobile, [Validators.required]],
      address: [this.patient.address],
      treatment: [this.patient.treatment],
      age: [this.patient.age, [Validators.required]],
      email: [this.patient.email, [Validators.required, Validators.email]],
      admissionDate: [
        formatDate(this.patient.admissionDate, 'yyyy-MM-dd', 'en'),
      ],
      dischargeDate: [
        formatDate(this.patient.dischargeDate, 'yyyy-MM-dd', 'en'),
      ],
      doctorAssigned: [this.patient.doctorAssigned],
      status: [this.patient.status],
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
    if (this.patientForm.valid) {
      if (this.action === 'edit') {
        this.patientService
          .updatePatient(this.patientForm.getRawValue())
          .subscribe({
            next: (response) => {
              this.dialogRef.close(response);
            },
            error: (_error) => {
              // Optionally display an error message to the user
            },
          });
      } else {
        this.patientService
          .addPatient(this.patientForm.getRawValue())
          .subscribe({
            next: (response) => {
              this.dialogRef.close(response);
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
