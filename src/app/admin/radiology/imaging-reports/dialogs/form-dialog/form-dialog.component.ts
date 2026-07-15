import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { ImagingReportsService } from '../../imaging-reports.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagingReport } from '../../imaging-reports.model';
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
  report: ImagingReport;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-imaging-reports-form',
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
    MatDialogClose
],
})
export class ImagingReportsFormComponent {
  dialogRef = inject<MatDialogRef<ImagingReportsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  imagingReportsService = inject(ImagingReportsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  reportForm: FormGroup;
  report: ImagingReport;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.report ? 
      data.report.reportId : 'New Report';
    this.report = this.action === 'edit' && data.report ? 
      data.report : new ImagingReport({});
    this.reportForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.report.id],
      reportId: [this.report.reportId, [Validators.required]],
      patientName: [this.report.patientName, [Validators.required]],
      scanType: [this.report.scanType, [Validators.required]],
      radiologistName: [this.report.radiologistName, [Validators.required]],
      reportDate: [this.report.reportDate, [Validators.required]],
      findings: [this.report.findings],
      status: [this.report.status, [Validators.required]],
      impression: [this.report.impression],
      recommendations: [this.report.recommendations],
    });
  }

  submit() {
    if (this.reportForm.valid) {
      if (this.action === 'edit') {
        this.imagingReportsService.updateImagingReport(this.reportForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.imagingReportsService.addImagingReport(this.reportForm.getRawValue()).subscribe({
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
