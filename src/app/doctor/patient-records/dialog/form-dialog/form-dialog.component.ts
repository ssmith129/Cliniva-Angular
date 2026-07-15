import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, inject , ChangeDetectionStrategy, signal} from '@angular/core';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AiService } from '@core/service/ai.service';

export interface DialogData {
  id: number;
  action: string;
  patientRecord: PatientRecord;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-record-form',
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
],
})
export class PatientRecordFormComponent {
  dialogRef = inject<MatDialogRef<PatientRecordFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private aiService = inject(AiService);
  private snackBar = inject(MatSnackBar);

  action: string;
  dialogTitle: string;
  patientRecordForm: FormGroup;
  patientRecord: PatientRecord;
  isAiLoading = signal<boolean>(false);
  aiSummary = signal<string>('');

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.patientRecord.name;
      this.patientRecord = data.patientRecord;
    } else {
      this.dialogTitle = 'New Patient Record';
      const blankObject = {} as PatientRecord;
      this.patientRecord = new PatientRecord(blankObject);
    }
    this.patientRecordForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.patientRecord.id],
      patientId: [this.patientRecord.patientId, [Validators.required]],
      name: [this.patientRecord.name, [Validators.required]],
      img: [this.patientRecord.img || 'assets/images/user/user1.jpg'],
      age: [this.patientRecord.age, [Validators.required]],
      gender: [this.patientRecord.gender, [Validators.required]],
      mobile: [this.patientRecord.mobile, [Validators.required]],
      lastVisitDate: [this.patientRecord.lastVisitDate, [Validators.required]],
      status: [this.patientRecord.status, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.patientRecordForm.getRawValue();
    this.dialogRef.close(data);
  }

  generateAiHealthSummary() {
    const name = this.patientRecordForm.get('name')?.value;
    const age = this.patientRecordForm.get('age')?.value;
    const gender = this.patientRecordForm.get('gender')?.value;
    const status = this.patientRecordForm.get('status')?.value;
    const lastVisit = this.patientRecordForm.get('lastVisitDate')?.value;

    this.isAiLoading.set(true);
    this.aiSummary.set('');

    const prompt = `Act as an expert clinical doctor's AI assistant. Generate a highly detailed, professional clinical status summary and a recommended monitoring care timeline for the following patient:
    - Name: ${name}
    - Age: ${age}
    - Gender: ${gender}
    - Current Clinic Status: ${status}
    - Last Visit Date: ${lastVisit}

    Structure the response with clear headings in HTML format (e.g. <h4>, <ul>, <li>). Do not include raw markdown wrap codes (like \`\`\`html). Make it look extremely premium, clean and clinical.`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (res: string) => {
        this.isAiLoading.set(false);
        if (res.includes('[DEMO MODE]')) {
          this.aiSummary.set(`
            <h4>Clinical Status Summary</h4>
            <p>Patient <strong>${name}</strong> (${age}yo ${gender}) is currently marked as <strong>${status}</strong>. Given the patient profile and age group, standard preventive care guidelines suggest tracking key metabolic and cardiac markers.</p>
            <ul>
              <li><strong>Cardiovascular Risk:</strong> Verify blood pressure trend over the last 3 visits.</li>
              <li><strong>Metabolic Profile:</strong> Age-appropriate blood glucose or HbA1c screening is recommended.</li>
            </ul>
            <h4>Recommended Care Timeline</h4>
            <ul>
              <li><strong>Weeks 1-2:</strong> Patient-led vital signs logs checking.</li>
              <li><strong>Month 1:</strong> Routine clinical consultation & vital monitoring review.</li>
              <li><strong>Month 3:</strong> Follow-up lipid panels if history of elevation exists.</li>
            </ul>
          `);
          this.snackBar.open('AI Patient Summary completed (Demo Mode)!', 'Close', { duration: 3000 });
          return;
        }

        this.aiSummary.set(res);
        this.snackBar.open('AI Patient Summary generated!', 'Close', { duration: 2000, panelClass: 'snackbar-success' });
      },
      error: () => {
        this.isAiLoading.set(false);
        this.snackBar.open('Failed to generate summary. Verify AI Configuration.', 'Close', { duration: 3000, panelClass: 'snackbar-danger' });
      }
    });
  }
}

class PatientRecord {
  id: number;
  patientId: string;
  name: string;
  img: string;
  age: number;
  gender: string;
  mobile: string;
  lastVisitDate: string;
  status: string;

  constructor(patientRecord: PatientRecord) {
    {
      this.id = patientRecord.id || this.getRandomId();
      this.patientId = patientRecord.patientId || '';
      this.name = patientRecord.name || '';
      this.img = patientRecord.img || 'assets/images/user/user1.jpg';
      this.age = patientRecord.age || 0;
      this.gender = patientRecord.gender || '';
      this.mobile = patientRecord.mobile || '';
      this.lastVisitDate = patientRecord.lastVisitDate || '';
      this.status = patientRecord.status || 'Active';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
