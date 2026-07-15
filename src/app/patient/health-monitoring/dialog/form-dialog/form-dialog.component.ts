import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HealthMetric } from '../../health-monitoring.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  metric: HealthMetric;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-health-metric-form',
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
    MatDatepickerModule,
    MatDialogClose
],
})
export class HealthMetricFormComponent {
  dialogRef = inject<MatDialogRef<HealthMetricFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  metricForm: FormGroup;
  metric: HealthMetric;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = `Edit ${data.metric.type} Metric`;
      this.metric = data.metric;
    } else {
      this.dialogTitle = 'New Health Metric';
      const blankObject = {} as HealthMetric;
      this.metric = new HealthMetricClass(blankObject);
    }
    this.metricForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.metric.id],
      date: [this.metric.date, [Validators.required]],
      time: [this.metric.time, [Validators.required]],
      type: [this.metric.type, [Validators.required]],
      value: [this.metric.value, [Validators.required]],
      unit: [this.metric.unit, [Validators.required]],
      status: [this.metric.status, [Validators.required]],
      notes: [this.metric.notes],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.metricForm.valid) {
      this.dialogRef.close(this.metricForm.getRawValue());
    }
  }
}

export class HealthMetricClass {
  id: number;
  date: string;
  time: string;
  type: string;
  value: string;
  unit: string;
  status: string;
  notes: string;

  constructor(metric: HealthMetric) {
    this.id = metric.id || 0;
    this.date = metric.date || '';
    this.time = metric.time || '';
    this.type = metric.type || '';
    this.value = metric.value || '';
    this.unit = metric.unit || '';
    this.status = metric.status || 'Normal';
    this.notes = metric.notes || '';
  }
}
