import { Component, inject , ChangeDetectionStrategy, signal} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabReport } from '../../lab-reports.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AiService } from '@core/service/ai.service';
import { NgClass } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  report: LabReport;
}

interface Metric {
  name: string;
  value: string;
  status: string;
  explanation: string;
}

interface InterpretationData {
  summary: string;
  metrics: Metric[];
  recommendations: string[];
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
    MatDialogClose,
    MatProgressSpinnerModule,
    NgClass,
  ],
})
export class LabReportFormComponent {
  dialogRef = inject<MatDialogRef<LabReportFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private aiService = inject(AiService);
  private snackBar = inject(MatSnackBar);

  isInterpreting = signal<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interpretationData = signal<InterpretationData>(null as any);

  action: string;
  dialogTitle: string;
  reportForm: FormGroup;
  report: LabReport;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.report.testName;
      this.report = data.report;
    } else {
      this.dialogTitle = 'New Lab Report';
      const blankObject = {} as LabReport;
      this.report = new LabReportClass(blankObject);
    }
    this.reportForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.report.id],
      reportId: [this.report.reportId, [Validators.required]],
      testName: [this.report.testName, [Validators.required]],
      testType: [this.report.testType, [Validators.required]],
      requestDate: [this.report.requestDate, [Validators.required]],
      reportDate: [this.report.reportDate],
      status: [this.report.status, [Validators.required]],
      priority: [this.report.priority, [Validators.required]],
      doctorName: [this.report.doctorName, [Validators.required]],
      labName: [this.report.labName, [Validators.required]],
      results: [this.report.results],
    });
  }

  interpretLabReport() {
    const results = this.reportForm.get('results')?.value;
    const testName = this.reportForm.get('testName')?.value;

    if (!results) {
      this.snackBar.open('Please enter results summary to interpret.', 'Close', { duration: 3000 });
      return;
    }

    this.isInterpreting.set(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.interpretationData.set(null as any);

    const prompt = `Act as an expert clinic pathologist. Interpret these lab report results:
Test Name: ${testName}
Results: ${results}

Explain the biomarkers/metrics, whether they are high/low/normal compared to standard reference ranges, and suggest patient care tips.
Return ONLY valid JSON:
{
  "summary": "Plain English summary of the results.",
  "metrics": [
    { "name": "Metric Name", "value": "Value", "status": "High" | "Low" | "Normal", "explanation": "Brief explanation of this metric." }
  ],
  "recommendations": [
    "Rec 1",
    "Rec 2"
  ]
}

No other text or markup. Return raw JSON.`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (res: string) => {
        this.isInterpreting.set(false);
        try {
          if (res.includes('[DEMO MODE]')) {
            const metrics = [];
            const lowerRes = results.toLowerCase();

            if (lowerRes.includes('cholesterol') || lowerRes.includes('ldl')) {
              metrics.push({ name: 'Total Cholesterol', value: '240 mg/dL', status: 'High', explanation: 'Desirable level is below 200 mg/dL. Higher values increase cardiac workload.' });
              metrics.push({ name: 'LDL Cholesterol', value: '160 mg/dL', status: 'High', explanation: 'Commonly known as "bad" cholesterol. Desirable is below 100 mg/dL.' });
            } else if (lowerRes.includes('hemoglobin') || lowerRes.includes('hgb')) {
              metrics.push({ name: 'Hemoglobin (Hgb)', value: '10.5 g/dL', status: 'Low', explanation: 'Normal range is 12-16 g/dL. Low values indicate mild anemia or low iron.' });
            } else if (lowerRes.includes('glucose') || lowerRes.includes('sugar')) {
              metrics.push({ name: 'Fasting Blood Glucose', value: '145 mg/dL', status: 'High', explanation: 'Normal fasting glucose is below 100 mg/dL. Elevated levels suggest pre-diabetes/diabetes.' });
            } else {
              metrics.push({ name: testName || 'Biomarker Check', value: results, status: 'Normal', explanation: 'Value is within reference bounds.' });
            }

            this.interpretationData.set({
              summary: `Your lab results for "${testName}" contain key parameters that fall outside normal limits.`,
              metrics: metrics,
              recommendations: [
                'Schedule a diagnostic review session with your primary doctor.',
                'Adjust your dietary fat/sugar intake based on these flagged biomarkers.',
                'Re-test your parameters in 4 to 6 weeks to log progress.'
              ]
            });
            this.snackBar.open('Lab reports interpreted (Demo Mode)!', 'Close', { duration: 3000 });
            return;
          }

          const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          this.interpretationData.set(parsed);
          this.snackBar.open('Lab report successfully interpreted!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
        } catch (_e) {
          this.snackBar.open('Interpretation parsing error. Try again.', 'Close', { duration: 3000 });
        }
      },
      error: () => {
        this.isInterpreting.set(false);
        this.snackBar.open('Interpretation request failed. Check settings.', 'Close', { duration: 3000 });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.reportForm.valid) {
      this.dialogRef.close(this.reportForm.getRawValue());
    }
  }
}

export class LabReportClass {
  id: number;
  reportId: string;
  testName: string;
  testType: string;
  requestDate: string;
  reportDate: string;
  status: string;
  priority: string;
  doctorName: string;
  labName: string;
  results: string;

  constructor(report: LabReport) {
    this.id = report.id || 0;
    this.reportId = report.reportId || '';
    this.testName = report.testName || '';
    this.testType = report.testType || '';
    this.requestDate = report.requestDate || '';
    this.reportDate = report.reportDate || '';
    this.status = report.status || 'Pending';
    this.priority = report.priority || 'Routine';
    this.doctorName = report.doctorName || '';
    this.labName = report.labName || '';
    this.results = report.results || '';
  }
}
