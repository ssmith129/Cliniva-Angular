import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { PatientStatisticsService } from '../../patient-statistics.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientStatistic } from '../../patient-statistics.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface DialogData { id: number; action: string; patientStatistic: PatientStatistic; }

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-statistics-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogContent, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatDialogClose],
})
export class PatientStatisticsFormComponent {
  dialogRef = inject<MatDialogRef<PatientStatisticsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  patientStatisticsService = inject(PatientStatisticsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  patientStatisticForm: FormGroup;
  patientStatistic: PatientStatistic;

  constructor() {
    const data = this.data;
    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.patientStatistic ? data.patientStatistic.patientName : 'New Patient Record';
    this.patientStatistic = this.action === 'edit' && data.patientStatistic ? data.patientStatistic : new PatientStatistic({} as PatientStatistic);
    this.patientStatisticForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.patientStatistic.id],
      img: [this.patientStatistic.img],
      patientName: [this.patientStatistic.patientName, [Validators.required]],
      age: [this.patientStatistic.age, [Validators.required]],
      gender: [this.patientStatistic.gender, [Validators.required]],
      bloodGroup: [this.patientStatistic.bloodGroup],
      diagnosis: [this.patientStatistic.diagnosis, [Validators.required]],
      admissionDate: [this.patientStatistic.admissionDate, [Validators.required]],
      ward: [this.patientStatistic.ward, [Validators.required]],
      status: [this.patientStatistic.status, [Validators.required]],
    });
  }

  submit() {
    if (this.patientStatisticForm.valid) {
      if (this.action === 'edit') {
        this.patientStatisticsService.updatePatientStatistic(this.patientStatisticForm.getRawValue()).subscribe({
          next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
        });
      } else {
        this.patientStatisticsService.addPatientStatistic(this.patientStatisticForm.getRawValue()).subscribe({
          next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
        });
      }
    }
  }

  onNoClick(): void { this.dialogRef.close(); }
}
