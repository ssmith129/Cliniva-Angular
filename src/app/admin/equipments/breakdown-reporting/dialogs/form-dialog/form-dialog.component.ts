import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { BreakdownReportingService } from '../../breakdown-reporting.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreakdownReport } from '../../breakdown-reporting.model';
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
  report: BreakdownReport;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-breakdown-reporting-form',
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
export class BreakdownReportingFormComponent {
  dialogRef = inject<MatDialogRef<BreakdownReportingFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  breakdownReportingService = inject(BreakdownReportingService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  reportForm: FormGroup;
  report: BreakdownReport;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.report ? 
      data.report.breakdown_id : 'New Report';
    this.report = this.action === 'edit' && data.report ? 
      data.report : new BreakdownReport({});
    this.reportForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.report.id],
      breakdown_id: [this.report.breakdown_id, [Validators.required]],
      equipment_id: [this.report.equipment_id, [Validators.required]],
      equipment_name: [this.report.equipment_name, [Validators.required]],
      department: [this.report.department, [Validators.required]],
      reported_date: [this.report.reported_date, [Validators.required]],
      reported_time: [this.report.reported_time, [Validators.required]],
      reported_by: [this.report.reported_by, [Validators.required]],
      problem_description: [this.report.problem_description, [Validators.required]],
      severity: [this.report.severity, [Validators.required]],
      status: [this.report.status, [Validators.required]],
      assigned_to: [this.report.assigned_to],
      resolution_date: [this.report.resolution_date],
      resolution_time: [this.report.resolution_time],
      downtime_hours: [this.report.downtime_hours],
      repair_cost: [this.report.repair_cost],
      action_taken: [this.report.action_taken],
      notes: [this.report.notes],
    });
  }

  submit() {
    if (this.reportForm.valid) {
      if (this.action === 'edit') {
        this.breakdownReportingService.updateReport(this.reportForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.breakdownReportingService.addReport(this.reportForm.getRawValue()).subscribe({
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
