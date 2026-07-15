import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { RadiologyReportsService } from '../../radiology-reports.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadiologyReport } from '../../radiology-reports.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface DialogData { id: number; action: string; radiologyReport: RadiologyReport; }

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-radiology-reports-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogContent, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatDialogClose],
})
export class RadiologyReportsFormComponent {
  dialogRef = inject<MatDialogRef<RadiologyReportsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  radiologyReportsService = inject(RadiologyReportsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  radiologyReportForm: FormGroup;
  radiologyReport: RadiologyReport;

  constructor() {
    const data = this.data;
    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.radiologyReport ? data.radiologyReport.patientName : 'New Radiology Report';
    this.radiologyReport = this.action === 'edit' && data.radiologyReport ? data.radiologyReport : new RadiologyReport({} as RadiologyReport);
    this.radiologyReportForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.radiologyReport.id],
      img: [this.radiologyReport.img],
      patientName: [this.radiologyReport.patientName, [Validators.required]],
      scanType: [this.radiologyReport.scanType, [Validators.required]],
      modality: [this.radiologyReport.modality, [Validators.required]],
      referredBy: [this.radiologyReport.referredBy, [Validators.required]],
      reportDate: [this.radiologyReport.reportDate, [Validators.required]],
      tat: [this.radiologyReport.tat],
      status: [this.radiologyReport.status, [Validators.required]],
    });
  }

  submit() {
    if (this.radiologyReportForm.valid) {
      if (this.action === 'edit') {
        this.radiologyReportsService.updateRadiologyReport(this.radiologyReportForm.getRawValue()).subscribe({
          next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
        });
      } else {
        this.radiologyReportsService.addRadiologyReport(this.radiologyReportForm.getRawValue()).subscribe({
          next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
        });
      }
    }
  }

  onNoClick(): void { this.dialogRef.close(); }
}
