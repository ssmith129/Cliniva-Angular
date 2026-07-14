import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { LabAnalyticsReportsService } from '../../lab-reports.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabAnalyticsReport } from '../../lab-reports.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface DialogData { id: number; action: string; labReport: LabAnalyticsReport; }

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lab-reports-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogContent, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatDialogClose],
})
export class LabReportsFormComponent {
  dialogRef = inject<MatDialogRef<LabReportsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  labReportsService = inject(LabAnalyticsReportsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  labReportForm: FormGroup;
  labReport: LabAnalyticsReport;

  constructor() {
    const data = this.data;
    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.labReport ? data.labReport.patientName : 'New Lab Report';
    this.labReport = this.action === 'edit' && data.labReport ? data.labReport : new LabAnalyticsReport({} as LabAnalyticsReport);
    this.labReportForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.labReport.id],
      img: [this.labReport.img],
      patientName: [this.labReport.patientName, [Validators.required]],
      testName: [this.labReport.testName, [Validators.required]],
      testCategory: [this.labReport.testCategory, [Validators.required]],
      requestedBy: [this.labReport.requestedBy, [Validators.required]],
      sampleDate: [this.labReport.sampleDate, [Validators.required]],
      tat: [this.labReport.tat],
      status: [this.labReport.status, [Validators.required]],
    });
  }

  submit() {
    if (this.labReportForm.valid) {
      if (this.action === 'edit') {
        this.labReportsService.updateLabReport(this.labReportForm.getRawValue()).subscribe({
          next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
        });
      } else {
        this.labReportsService.addLabReport(this.labReportForm.getRawValue()).subscribe({
          next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
        });
      }
    }
  }

  onNoClick(): void { this.dialogRef.close(); }
}
