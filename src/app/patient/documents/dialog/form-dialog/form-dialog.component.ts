import { Component, inject, ChangeDetectionStrategy, signal} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Document } from '../../documents.model';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AiService } from '@core/service/ai.service';

export interface DialogData {
  id: number;
  action: string;
  document: Document;
}

interface Translation {
  medicalTerm: string;
  plainEnglish: string;
}

interface ExplainedData {
  simpleSummary: string;
  translations: Translation[];
  patientTips: string[];
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-document-form',
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
  ],
})
export class DocumentFormComponent {
  dialogRef = inject<MatDialogRef<DocumentFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private aiService = inject(AiService);
  private snackBar = inject(MatSnackBar);

  isTranslating = signal<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  explainedData = signal<ExplainedData>(null as any);

  action: string;
  dialogTitle: string;
  docForm: FormGroup;
  document: Document;

  constructor() {
    const data = this.data;

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.document.title;
      this.document = data.document;
    } else {
      this.dialogTitle = 'New Document';
      const blankObject = {} as Document;
      this.document = new DocumentClass(blankObject);
    }
    this.docForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.document.id],
      docId: [this.document.docId, [Validators.required]],
      title: [this.document.title, [Validators.required]],
      type: [this.document.type, [Validators.required]],
      category: [this.document.category, [Validators.required]],
      uploadDate: [this.document.uploadDate, [Validators.required]],
      size: [this.document.size, [Validators.required]],
      status: [this.document.status, [Validators.required]],
      description: [this.document.description],
    });
  }

  explainMedicalJargon() {
    const description = this.docForm.get('description')?.value;
    if (!description) {
      this.snackBar.open('No description/notes found to translate.', 'Close', { duration: 3000 });
      return;
    }

    this.isTranslating.set(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.explainedData.set(null as any);

    const prompt = `Act as an empathetic patient-facing medical communicator. 
Read this complex clinical description/report:
"${description}"

Translate all medical jargon, abbreviations, and complex diagnoses into simple plain English.
Provide definitions for each jargon word found. 
Suggest 3 simple next-steps/care-tips for the patient in plain language.

Return ONLY a valid JSON object matching this structure:
{
  "simpleSummary": "A plain English summary of the medical report.",
  "translations": [
    { "medicalTerm": "Term", "plainEnglish": "Simple explanation" }
  ],
  "patientTips": [
    "Tip 1",
    "Tip 2",
    "Tip 3"
  ]
}

Do not wrap in markdown or add notes outside JSON.`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (res: string) => {
        this.isTranslating.set(false);
        try {
          if (res.includes('[DEMO MODE]')) {
            const translations = [];
            const lowerDesc = description.toLowerCase();
            if (lowerDesc.includes('myocardial')) {
              translations.push({ medicalTerm: 'Acute Myocardial Infarction', plainEnglish: 'A sudden heart attack caused by a blocked blood vessel in the heart.' });
            }
            if (lowerDesc.includes('hyperlipidemia')) {
              translations.push({ medicalTerm: 'Hyperlipidemia', plainEnglish: 'High level of fats (cholesterol/triglycerides) in the blood.' });
            }
            if (lowerDesc.includes('hypertension')) {
              translations.push({ medicalTerm: 'Hypertension', plainEnglish: 'High blood pressure, which puts stress on the heart and blood vessels.' });
            }
            if (translations.length === 0) {
              translations.push({ medicalTerm: 'Clinical notes', plainEnglish: 'Physician observations and therapeutic recommendations.' });
            }

            this.explainedData.set({
              simpleSummary: 'This document describes your clinical history and recent diagnostic highlights.',
              translations: translations,
              patientTips: [
                'Keep a daily record of your vitals and physical symptoms.',
                'Follow up with your primary physician to discuss these results.',
                'Maintain low-sodium diets and gentle daily cardio exercises.'
              ]
            });
            this.snackBar.open('Medical notes explained (Demo Mode)!', 'Close', { duration: 3000 });
            return;
          }

          const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          this.explainedData.set(parsed);
          this.snackBar.open('AI explanation loaded successfully!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
        } catch (_e) {
          this.snackBar.open('AI parsing error. Check description text.', 'Close', { duration: 3000 });
        }
      },
      error: () => {
        this.isTranslating.set(false);
        this.snackBar.open('Failed to explain document. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    if (this.docForm.valid) {
      this.dialogRef.close(this.docForm.getRawValue());
    }
  }
}

export class DocumentClass {
  id: number;
  docId: string;
  title: string;
  type: string;
  category: string;
  uploadDate: string;
  size: string;
  status: string;
  description: string;

  constructor(doc: Document) {
    this.id = doc.id || 0;
    this.docId = doc.docId || '';
    this.title = doc.title || '';
    this.type = doc.type || '';
    this.category = doc.category || '';
    this.uploadDate = doc.uploadDate || '';
    this.size = doc.size || '';
    this.status = doc.status || 'Pending';
    this.description = doc.description || '';
  }
}
