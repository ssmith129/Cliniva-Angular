import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { ClinicalReportsService } from '../../clinical-reports.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClinicalReport } from '../../clinical-reports.model';
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
  clinicalReport: ClinicalReport;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-clinical-reports-form',
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
export class ClinicalReportsFormComponent {
  dialogRef = inject<MatDialogRef<ClinicalReportsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  clinicalReportsService = inject(ClinicalReportsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  clinicalReportForm: FormGroup;
  clinicalReport: ClinicalReport;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.clinicalReport ? 
      data.clinicalReport.patientName : 'New Clinical Report';
    this.clinicalReport = this.action === 'edit' && data.clinicalReport ? 
      data.clinicalReport : new ClinicalReport({} as ClinicalReport);
    this.clinicalReportForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.clinicalReport.id],
      img: [this.clinicalReport.img],
      patientName: [this.clinicalReport.patientName, [Validators.required]],
      doctorName: [this.clinicalReport.doctorName, [Validators.required]],
      diagnosis: [this.clinicalReport.diagnosis, [Validators.required]],
      visitDate: [this.clinicalReport.visitDate, [Validators.required]],
      status: [this.clinicalReport.status, [Validators.required]],
    });
  }

  submit() {
    if (this.clinicalReportForm.valid) {
      if (this.action === 'edit') {
        this.clinicalReportsService.updateClinicalReport(this.clinicalReportForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.clinicalReportsService.addClinicalReport(this.clinicalReportForm.getRawValue()).subscribe({
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
