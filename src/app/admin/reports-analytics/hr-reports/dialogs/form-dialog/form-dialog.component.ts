import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { HrReportsService } from '../../hr-reports.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HrReport } from '../../hr-reports.model';
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
  hrReport: HrReport;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hr-reports-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule, MatIconModule, MatDialogContent, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatDialogClose
  ],
})
export class HrReportsFormComponent {
  dialogRef = inject<MatDialogRef<HrReportsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  hrReportsService = inject(HrReportsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  hrReportForm: FormGroup;
  hrReport: HrReport;

  constructor() {
    const data = this.data;
    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.hrReport ? data.hrReport.employeeName : 'New HR Report';
    this.hrReport = this.action === 'edit' && data.hrReport ? data.hrReport : new HrReport({} as HrReport);
    this.hrReportForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.hrReport.id],
      img: [this.hrReport.img],
      employeeName: [this.hrReport.employeeName, [Validators.required]],
      department: [this.hrReport.department, [Validators.required]],
      designation: [this.hrReport.designation, [Validators.required]],
      presentDays: [this.hrReport.presentDays, [Validators.required]],
      absentDays: [this.hrReport.absentDays],
      salary: [this.hrReport.salary, [Validators.required]],
      paymentStatus: [this.hrReport.paymentStatus, [Validators.required]],
      month: [this.hrReport.month, [Validators.required]],
    });
  }

  submit() {
    if (this.hrReportForm.valid) {
      if (this.action === 'edit') {
        this.hrReportsService.updateHrReport(this.hrReportForm.getRawValue()).subscribe({
          next: (response) => { this.dialogRef.close(response); },
          error: (_error) => {},
        });
      } else {
        this.hrReportsService.addHrReport(this.hrReportForm.getRawValue()).subscribe({
          next: (response) => { this.dialogRef.close(response); },
          error: (_error) => {},
        });
      }
    }
  }

  onNoClick(): void { this.dialogRef.close(); }
}
