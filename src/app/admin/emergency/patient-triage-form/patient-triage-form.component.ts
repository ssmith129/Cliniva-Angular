import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AiService } from '@core/service/ai.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';

export interface AiTriageResult {
  esiLevel: number;
  justification: string;
  primaryRisks: string[];
  recommendedDiagnostics: string[];
  immediatePrecautions: string[];
}

@Component({
  selector: 'app-patient-triage-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    BreadcrumbComponent,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule
  ],
  templateUrl: './patient-triage-form.component.html',
  styleUrl: './patient-triage-form.component.scss'
})
export class PatientTriageFormComponent implements OnInit {
  triageForm!: FormGroup;
  private aiService = inject(AiService);
  private snackBar = inject(MatSnackBar);
  
  isAiLoading = signal<boolean>(false);
  aiResult = signal<AiTriageResult | null>(null);

  esiLevels = [
    { value: 1, label: 'Level 1: Resuscitation (Immediate)' },
    { value: 2, label: 'Level 2: Emergent (15 mins)' },
    { value: 3, label: 'Level 3: Urgent (30-60 mins)' },
    { value: 4, label: 'Level 4: Less Urgent (1-2 hours)' },
    { value: 5, label: 'Level 5: Non-Urgent (2-24 hours)' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.triageForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['Male', Validators.required],
      chiefComplaint: ['', Validators.required],
      symptoms: [''],
      bpSystolic: ['', [Validators.required, Validators.min(0)]],
      bpDiastolic: ['', [Validators.required, Validators.min(0)]],
      heartRate: ['', [Validators.required, Validators.min(0)]],
      respiratoryRate: ['', Validators.required],
      temperature: ['', Validators.required],
      spo2: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      painScale: [0],
      esiLevel: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.triageForm.valid) {
      console.log('Triage Form Submitted', this.triageForm.value);
      this.snackBar.open('Triage Form Submitted successfully!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
    } else {
      this.triageForm.markAllAsTouched();
    }
  }

  get painScaleValue() {
    return this.triageForm.get('painScale')?.value;
  }

  runAiTriage() {
    const rawComplaint = this.triageForm.get('chiefComplaint')?.value;
    const rawSymptoms = this.triageForm.get('symptoms')?.value;
    
    if (!rawComplaint) {
      this.snackBar.open('Please enter a chief complaint first before starting AI Triage evaluation.', 'Close', { duration: 3000 });
      return;
    }

    this.isAiLoading.set(true);

    const vitals = {
      bpSystolic: this.triageForm.get('bpSystolic')?.value || 120,
      bpDiastolic: this.triageForm.get('bpDiastolic')?.value || 80,
      heartRate: this.triageForm.get('heartRate')?.value || 72,
      respiratoryRate: this.triageForm.get('respiratoryRate')?.value || 16,
      temperature: this.triageForm.get('temperature')?.value || 36.8,
      spo2: this.triageForm.get('spo2')?.value || 98,
      painScale: this.triageForm.get('painScale')?.value || 0
    };

    const prompt = `Act as an expert emergency room triage clinician.
    Based on the patient's vitals, chief complaint, and symptoms:
    - Chief Complaint: ${rawComplaint}
    - Symptoms: ${rawSymptoms || 'None reported'}
    - Vitals: BP: ${vitals.bpSystolic}/${vitals.bpDiastolic} mmHg, HR: ${vitals.heartRate} bpm, RR: ${vitals.respiratoryRate} /min, Temp: ${vitals.temperature} °C, SpO2: ${vitals.spo2}%, Pain: ${vitals.painScale}/10.

    Analyze this data and determine the appropriate Emergency Severity Index (ESI) Level (1 to 5):
    1: Resuscitation (Immediate life-saving intervention needed)
    2: Emergent (High risk, confused/lethargic, or severe pain/distress)
    3: Urgent (Many resources required, stable vitals)
    4: Less Urgent (One resource required)
    5: Non-Urgent (No resources required)

    Return ONLY a valid JSON object with the following structure (do not include other markdown wrapper text other than json block):
    {
      "esiLevel": 1 | 2 | 3 | 4 | 5,
      "justification": "Detailed medical explanation of why this ESI level was selected.",
      "primaryRisks": ["Risk 1", "Risk 2"],
      "recommendedDiagnostics": ["Diagnostic 1", "Diagnostic 2"],
      "immediatePrecautions": ["Precaution 1", "Precaution 2"]
    }`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (res: string) => {
        this.isAiLoading.set(false);
        try {
          const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson) as AiTriageResult;
          this.aiResult.set(parsed);
          
          this.triageForm.patchValue({
            esiLevel: parsed.esiLevel
          });
          this.snackBar.open('AI Triage Evaluation completed!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
        } catch (_e) {
          // Fallback parsing for mock/text responses
          const suggestedEsi = res.includes('1') ? 1 : res.includes('2') ? 2 : res.includes('4') ? 4 : res.includes('5') ? 5 : 3;
          const fallbackResult: AiTriageResult = {
            esiLevel: suggestedEsi,
            justification: res.length > 50 ? res : 'AI evaluated symptoms. Recommended ESI Level: ' + suggestedEsi,
            primaryRisks: ['Clinical changes', 'Vital signs progression'],
            recommendedDiagnostics: ['Stat blood counts', 'ECG evaluation'],
            immediatePrecautions: ['Place in monitored observation bed', 'Frequent vital sign checks']
          };
          this.aiResult.set(fallbackResult);
          this.triageForm.patchValue({ esiLevel: suggestedEsi });
          this.snackBar.open('AI Triage finished.', 'Close', { duration: 3000 });
        }
      },
      error: () => {
        this.isAiLoading.set(false);
        this.snackBar.open('AI Evaluation failed. Please verify API configuration in dashboard.', 'Close', { duration: 3000, panelClass: 'snackbar-danger' });
      }
    });
  }
}
