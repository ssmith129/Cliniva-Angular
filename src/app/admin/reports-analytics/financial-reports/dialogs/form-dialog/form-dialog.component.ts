import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FinancialReportsService } from '../../financial-reports.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinancialReport } from '../../financial-reports.model';
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
  financialReport: FinancialReport;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-financial-reports-form',
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
export class FinancialReportsFormComponent {
  dialogRef = inject<MatDialogRef<FinancialReportsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  financialReportsService = inject(FinancialReportsService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  financialReportForm: FormGroup;
  financialReport: FinancialReport;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.financialReport ? 
      data.financialReport.description : 'New Financial Record';
    this.financialReport = this.action === 'edit' && data.financialReport ? 
      data.financialReport : new FinancialReport({} as FinancialReport);
    this.financialReportForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.financialReport.id],
      transactionId: [this.financialReport.transactionId, [Validators.required]],
      description: [this.financialReport.description, [Validators.required]],
      amount: [this.financialReport.amount, [Validators.required]],
      type: [this.financialReport.type, [Validators.required]],
      date: [this.financialReport.date, [Validators.required]],
      status: [this.financialReport.status, [Validators.required]],
    });
  }

  submit() {
    if (this.financialReportForm.valid) {
      if (this.action === 'edit') {
        this.financialReportsService.updateFinancialReport(this.financialReportForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.financialReportsService.addFinancialReport(this.financialReportForm.getRawValue()).subscribe({
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
