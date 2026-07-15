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
import { MatDatepickerModule } from '@angular/material/datepicker';


export interface DialogData {
  id: number;
  action: string;
  labReport: LabReport;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lab-report-form',
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
export class LabReportFormComponent {
  dialogRef = inject<MatDialogRef<LabReportFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  labReportForm: FormGroup;
  labReport: LabReport;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.labReport.reportId;
      this.labReport = data.labReport;
    } else {
      this.dialogTitle = 'New Lab Report';
      const blankObject = {} as LabReport;
      this.labReport = new LabReport(blankObject);
    }
    this.labReportForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.labReport.id],
      reportId: [this.labReport.reportId, [Validators.required]],
      patientName: [this.labReport.patientName, [Validators.required]],
      img: [this.labReport.img || 'assets/images/user/user1.jpg'],
      patientId: [this.labReport.patientId, [Validators.required]],
      testName: [this.labReport.testName, [Validators.required]],
      testType: [this.labReport.testType, [Validators.required]],
      requestDate: [this.labReport.requestDate, [Validators.required]],
      priority: [this.labReport.priority, [Validators.required]],
      status: [this.labReport.status, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.labReportForm.getRawValue();
    this.dialogRef.close(data);
  }
}

class LabReport {
  id: number;
  reportId: string;
  patientName: string;
  img: string;
  patientId: string;
  testName: string;
  testType: string;
  requestDate: string;
  priority: string;
  status: string;

  constructor(labReport: LabReport) {
    {
      this.id = labReport.id || this.getRandomId();
      this.reportId = labReport.reportId || '';
      this.patientName = labReport.patientName || '';
      this.img = labReport.img || 'assets/images/user/user1.jpg';
      this.patientId = labReport.patientId || '';
      this.testName = labReport.testName || '';
      this.testType = labReport.testType || '';
      this.requestDate = labReport.requestDate || '';
      this.priority = labReport.priority || 'Routine';
      this.status = labReport.status || 'Pending';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
