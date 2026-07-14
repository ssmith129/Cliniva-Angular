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
import { AiService } from '@core/service/ai.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgClass } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  prescription: Prescription;
}

interface DrugAlert {
  severity: string;
  title: string;
  message: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-prescription-form',
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
    NgClass
],
})
export class PrescriptionFormComponent {
  dialogRef = inject<MatDialogRef<PrescriptionFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private aiService = inject(AiService);
  private snackBar = inject(MatSnackBar);

  action: string;
  dialogTitle: string;
  prescriptionForm: FormGroup;
  prescription: Prescription;
  isAiLoading = signal<boolean>(false);
  isSafetyChecking = signal<boolean>(false);
  aiAlerts = signal<DrugAlert[]>([]);

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.prescription.prescriptionId;
      this.prescription = data.prescription;
    } else {
      this.dialogTitle = 'New Prescription';
      const blankObject = {} as Prescription;
      this.prescription = new Prescription(blankObject);
    }
    this.prescriptionForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.prescription.id],
      prescriptionId: [this.prescription.prescriptionId, [Validators.required]],
      patientName: [this.prescription.patientName, [Validators.required]],
      img: [this.prescription.img || 'assets/images/user/user1.jpg'],
      patientId: [this.prescription.patientId, [Validators.required]],
      prescriptionDate: [this.prescription.prescriptionDate, [Validators.required]],
      medications: [this.prescription.medications, [Validators.required]],
      dosage: [this.prescription.dosage, [Validators.required]],
      frequency: [this.prescription.frequency, [Validators.required]],
      duration: [this.prescription.duration, [Validators.required]],
      status: [this.prescription.status, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = this.prescriptionForm.getRawValue();
    this.dialogRef.close(data);
  }

  generatePrescriptionScribe() {
    const rawMedications = this.prescriptionForm.get('medications')?.value;
    if (!rawMedications || rawMedications.length < 5) {
      this.snackBar.open('Please enter some raw details or medicine name in medications field first.', 'Close', { duration: 3000 });
      return;
    }

    this.isAiLoading.set(true);
    const prompt = `Act as an expert medical assistant. Based on this raw prescription / symptom request, extract or generate details in JSON format. 
    Return ONLY valid JSON with these keys: 
    - "medications" (structured list or string of meds)
    - "dosage" (dosage info, e.g. "500 mg")
    - "frequency" (frequency, e.g. "Twice daily")
    - "duration" (duration, e.g. "7 days")

    Raw input: ${rawMedications}`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (res: string) => {
        this.isAiLoading.set(false);
        try {
          const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          
          this.prescriptionForm.patchValue({
            medications: parsed.medications || rawMedications,
            dosage: parsed.dosage || '',
            frequency: parsed.frequency || '',
            duration: parsed.duration || ''
          });
          this.snackBar.open('AI Prescription Scribe completed!', 'Close', { duration: 2000, panelClass: 'snackbar-success' });
        } catch (_e) {
          this.prescriptionForm.patchValue({
            dosage: 'As directed',
            frequency: 'Once daily',
            duration: '5 days'
          });
          this.snackBar.open('Prescription parsed with default values.', 'Close', { duration: 3000 });
        }
      },
      error: () => {
        this.isAiLoading.set(false);
        this.snackBar.open('AI Scribe failed. Please check your AI settings.', 'Close', { duration: 3000, panelClass: 'snackbar-danger' });
      }
    });
  }

  checkDrugSafety() {
    const medications = this.prescriptionForm.get('medications')?.value;
    const patientName = this.prescriptionForm.get('patientName')?.value;
    
    if (!medications || medications.length < 3) {
      this.snackBar.open('Please specify medications before running safety check.', 'Close', { duration: 3000 });
      return;
    }

    this.isSafetyChecking.set(true);
    this.aiAlerts.set([]);

    const prompt = `Act as an expert clinical pharmacist and AI drug safety checker. 
    Analyze this prescription for patient "${patientName}":
    Medications: "${medications}"
    
    Check for:
    1. Drug-Drug Interactions
    2. Drug-Allergy Warnings (simulate if allergy is suspected)
    3. Vital Signs/Dosage Contraindications
    
    Return ONLY valid JSON format. The response should be a JSON array of alert objects, e.g.:
    [
      {
        "severity": "danger",
        "title": "Severe Interaction Warning",
        "message": "Aspirin combined with Warfarin significantly increases risk of internal bleeding. Monitor INR levels."
      },
      {
        "severity": "warning",
        "title": "Allergy Check",
        "message": "Verify if patient is allergic to penicillin derivatives."
      }
    ]
    
    If no issues are found, return an empty array []. No introductory text, no markdown wrapping.`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (res: string) => {
        this.isSafetyChecking.set(false);
        try {
          if (res.includes('[DEMO MODE]')) {
            this.aiAlerts.set([
              {
                severity: 'danger',
                title: 'Drug-Drug Interaction Alert',
                message: 'Potential high-risk interaction between the prescribed medications and common anticoagulants. Verify patient active medication list.'
              },
              {
                severity: 'warning',
                title: 'Allergy Verification Required',
                message: 'Confirm patient does not have a history of hypersensitivity to this medication group.'
              },
              {
                severity: 'info',
                title: 'Dosage Recommendation',
                message: 'AI suggests adjusting frequency for elderly patients or patients with renal clearance below 60 mL/min.'
              }
            ]);
            this.snackBar.open('AI Drug Safety Check completed (Demo Mode)!', 'Close', { duration: 3000 });
            return;
          }

          const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          this.aiAlerts.set(Array.isArray(parsed) ? parsed : []);
          
          if (this.aiAlerts().length === 0) {
            this.aiAlerts.set([
              {
                severity: 'success',
                title: 'Prescription Clear',
                message: 'No immediate drug-drug interactions or allergy contraindications detected by AI.'
              }
            ]);
          }
          this.snackBar.open('AI Drug Safety Check completed!', 'Close', { duration: 2000, panelClass: 'snackbar-success' });
        } catch (_e) {
          this.aiAlerts.set([
            {
              severity: 'warning',
              title: 'AI Warning',
              message: 'Check completed but response could not be parsed. Please verify manual drug safety guidelines.'
            }
          ]);
        }
      },
      error: () => {
        this.isSafetyChecking.set(false);
        this.snackBar.open('Safety check failed. Check AI Configuration.', 'Close', { duration: 3000, panelClass: 'snackbar-danger' });
      }
    });
  }
}

class Prescription {
  id: number;
  prescriptionId: string;
  patientName: string;
  img: string;
  patientId: string;
  prescriptionDate: string;
  medications: string;
  dosage: string;
  frequency: string;
  duration: string;
  status: string;

  constructor(prescription: Prescription) {
    {
      this.id = prescription.id || this.getRandomId();
      this.prescriptionId = prescription.prescriptionId || '';
      this.patientName = prescription.patientName || '';
      this.img = prescription.img || 'assets/images/user/user1.jpg';
      this.patientId = prescription.patientId || '';
      this.prescriptionDate = prescription.prescriptionDate || '';
      this.medications = prescription.medications || '';
      this.dosage = prescription.dosage || '';
      this.frequency = prescription.frequency || '';
      this.duration = prescription.duration || '';
      this.status = prescription.status || 'Active';
    }
  }

  public getRandomId(): number {
    return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  }
}
