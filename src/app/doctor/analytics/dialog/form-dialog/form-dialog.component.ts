import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


export interface DialogData {
  id: number;
  action: string;
  analytics: AnalyticsRecord;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-analytics-form',
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
    MatDialogClose
],
})
export class AnalyticsFormComponent {
  dialogRef = inject<MatDialogRef<AnalyticsFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  analyticsForm: FormGroup;
  analytics: AnalyticsRecord;
  periodList = [
    'Today',
    'This Week',
    'This Month',
    'This Quarter',
    'This Year',
  ];

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.analytics.metric;
      this.analytics = data.analytics;
    } else {
      this.dialogTitle = 'New Analytics Record';
      const blankObject = {} as AnalyticsRecord;
      this.analytics = new AnalyticsRecord(blankObject);
    }
    this.analyticsForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.analytics.id],
      metric: [this.analytics.metric, [Validators.required]],
      value: [this.analytics.value, [Validators.required]],
      change: [this.analytics.change, [Validators.required]],
      period: [this.analytics.period, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.analyticsForm.getRawValue();
    this.dialogRef.close(data);
  }
}

class AnalyticsRecord {
  id: number;
  metric: string;
  value: number;
  change: string;
  period: string;

  constructor(analytics: AnalyticsRecord) {
    {
      this.id = analytics.id || this.getRandomId();
      this.metric = analytics.metric || '';
      this.value = analytics.value || 0;
      this.change = analytics.change || '';
      this.period = analytics.period || '';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
