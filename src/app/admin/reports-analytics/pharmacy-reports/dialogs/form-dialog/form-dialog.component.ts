import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { PharmacyReportsService } from '../../pharmacy-reports.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PharmacyReport } from '../../pharmacy-reports.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface DialogData { id: number; action: string; pharmacyReport: PharmacyReport; }

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-pharmacy-reports-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogContent, FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatDatepickerModule, MatDialogClose],
})
export class PharmacyReportsFormComponent {
  dialogRef = inject<MatDialogRef<PharmacyReportsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  pharmacyReportsService = inject(PharmacyReportsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  pharmacyReportForm: FormGroup;
  pharmacyReport: PharmacyReport;

  constructor() {
    const data = this.data;
    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.pharmacyReport ? data.pharmacyReport.medicineName : 'New Pharmacy Report';
    this.pharmacyReport = this.action === 'edit' && data.pharmacyReport ? data.pharmacyReport : new PharmacyReport({} as PharmacyReport);
    this.pharmacyReportForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.pharmacyReport.id],
      medicineName: [this.pharmacyReport.medicineName, [Validators.required]],
      category: [this.pharmacyReport.category, [Validators.required]],
      unitsSold: [this.pharmacyReport.unitsSold, [Validators.required]],
      revenue: [this.pharmacyReport.revenue, [Validators.required]],
      stockMovement: [this.pharmacyReport.stockMovement],
      expiryDate: [this.pharmacyReport.expiryDate, [Validators.required]],
      status: [this.pharmacyReport.status, [Validators.required]],
      date: [this.pharmacyReport.date],
    });
  }

  submit() {
    if (this.pharmacyReportForm.valid) {
      if (this.action === 'edit') {
        this.pharmacyReportsService.updatePharmacyReport(this.pharmacyReportForm.getRawValue()).subscribe({
          next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
        });
      } else {
        this.pharmacyReportsService.addPharmacyReport(this.pharmacyReportForm.getRawValue()).subscribe({
          next: (response) => { this.dialogRef.close(response); }, error: (_error) => {},
        });
      }
    }
  }

  onNoClick(): void { this.dialogRef.close(); }
}
