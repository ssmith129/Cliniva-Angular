import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { LabReportsService } from '../../lab-reports.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabReport } from '../../lab-reports.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface DialogData {
  id: number;
  action: string;
  labReport: LabReport;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lab-reports-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatDialogClose,
  ],
})
export class LabReportsFormComponent {
  dialogRef = inject<MatDialogRef<LabReportsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  labReportsService = inject(LabReportsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  labReportForm: FormGroup;
  labReport: LabReport;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.labReport ? 
      data.labReport.reportId : 'New Report';
    this.labReport = this.action === 'edit' && data.labReport ? 
      data.labReport : new LabReport({});
    this.labReportForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.labReport.id],
      reportId: [this.labReport.reportId, [Validators.required]],
      patientName: [this.labReport.patientName, [Validators.required]],
      tests: [this.labReport.tests, [Validators.required]],
      doctorName: [this.labReport.doctorName, [Validators.required]],
      reportDate: [this.labReport.reportDate, [Validators.required]],
      status: [this.labReport.status, [Validators.required]],
      department: [this.labReport.department, [Validators.required]],
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  submit() {
    if (this.labReportForm.valid) {
      if (this.action === 'edit') {
        this.labReportsService.updateLabReport(this.labReportForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.labReportsService.addLabReport(this.labReportForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}