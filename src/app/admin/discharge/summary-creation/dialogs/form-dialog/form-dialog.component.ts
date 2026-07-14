import { Component, inject , ChangeDetectionStrategy, signal} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { SummaryCreationService } from '../../summary-creation.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DischargeSummary } from '../../summary-creation.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AiService } from '@core/service/ai.service';

export interface DialogData {
  id: number;
  action: string;
  summary: DischargeSummary;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-summary-creation-form',
  template: `
    <div class="addContainer">
      <div class="modalHeader">
        <div class="avatarDetails">
          <div class="modalTitle">{{ dialogTitle }}</div>
        </div>
        <button mat-icon-button mat-dialog-close class="modal-close-button" aria-label="Close dialog" type="button">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div mat-dialog-content>
        <form class="register-form m-4" [formGroup]="summaryForm" (ngSubmit)="submit()">
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Summary ID</mat-label>
                <input matInput formControlName="summaryId" required>
                 <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>qr_code</mat-icon>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Patient Name</mat-label>
                <input matInput formControlName="patientName" required>
                 <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>face</mat-icon>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Discharge Date</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="dischargeDate" required>
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
              </mat-form-field>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
               <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Status</mat-label>
                <mat-select formControlName="status" required>
                  <mat-option value="Draft">Draft</mat-option>
                  <mat-option value="Finalized">Finalized</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>
           <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Primary Diagnosis</mat-label>
                <input matInput formControlName="primaryDiagnosis" required>
              </mat-form-field>
            </div>
          </div>
          <div class="row mb-3 align-items-center">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between align-items-center">
              <span class="text-muted d-flex align-items-center" style="font-size: 0.85rem; gap: 4px;">
                <mat-icon style="font-size: 16px; width: 16px; height: 16px; color: #a855f7;">auto_awesome</mat-icon>
                Fill Primary Diagnosis then auto-draft remaining fields
              </span>
              <button type="button" mat-flat-button 
                [disabled]="isGenerating() || !summaryForm.get('primaryDiagnosis')?.value"
                (click)="generateAiSummary()"
                style="background: linear-gradient(135deg, #a855f7, #6366f1); color: white; display: flex; align-items: center; gap: 6px; padding: 4px 12px; height: 36px; line-height: 36px; border-radius: 6px;">
                @if (isGenerating()) {
                  <ng-container>
                    <mat-spinner diameter="16" style="margin-right: 5px; display: inline-block; vertical-align: middle;"></mat-spinner>
                    Generating...
                  </ng-container>
                } @else {
                  <ng-container>
                    <mat-icon style="font-size: 16px; width: 16px; height: 16px; margin: 0;">auto_awesome</mat-icon>
                    AI Auto-Write
                  </ng-container>
                }
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Procedures Performed</mat-label>
                <textarea matInput formControlName="proceduresPerformed"></textarea>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Treatment Given</mat-label>
                <textarea matInput formControlName="treatmentGiven"></textarea>
              </mat-form-field>
            </div>
             <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Follow Up Instructions</mat-label>
                <textarea matInput formControlName="followUpInstructions"></textarea>
              </mat-form-field>
            </div>
          </div>
           <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Author</mat-label>
                <input matInput formControlName="author" required>
                <mat-icon class="material-icons-outlined color-icon p-3" matSuffix>person</mat-icon>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <mat-form-field class="example-full-width" appearance="outline">
                <mat-label>Notes</mat-label>
                <textarea matInput formControlName="notes"></textarea>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
              <div class="example-button-row">
                <button mat-flat-button class="formSubmitBtn" [disabled]="!summaryForm.valid" type="submit">Save</button>
                <button mat-flat-button mat-dialog-close class="formCancelBtn" tabindex="-1">Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
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
    MatDialogClose,
    MatProgressSpinnerModule,
  ],
})
export class SummaryCreationFormComponent {
  dialogRef = inject<MatDialogRef<SummaryCreationFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  summaryService = inject(SummaryCreationService);
  private fb = inject(FormBuilder);
  private aiService = inject(AiService);
  private snackBar = inject(MatSnackBar);

  isGenerating = signal<boolean>(false);
  action: string;
  dialogTitle: string;
  summaryForm: FormGroup;
  summary: DischargeSummary;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.summary ? 
      data.summary.summaryId : 'New Summary';
    this.summary = this.action === 'edit' && data.summary ? 
      data.summary : new DischargeSummary({});
    this.summaryForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.summary.id],
      summaryId: [this.summary.summaryId, [Validators.required]],
      patientName: [this.summary.patientName, [Validators.required]],
      admissionDate: [this.summary.admissionDate],
      dischargeDate: [this.summary.dischargeDate, [Validators.required]],
      primaryDiagnosis: [this.summary.primaryDiagnosis, [Validators.required]],
      proceduresPerformed: [this.summary.proceduresPerformed],
      treatmentGiven: [this.summary.treatmentGiven],
      followUpInstructions: [this.summary.followUpInstructions],
      author: [this.summary.author, [Validators.required]],
      status: [this.summary.status, [Validators.required]],
      notes: [this.summary.notes],
    });
  }

  generateAiSummary() {
    const diagnosis = this.summaryForm.get('primaryDiagnosis')?.value;
    const patientName = this.summaryForm.get('patientName')?.value;

    if (!diagnosis) {
      this.snackBar.open('Please enter a Primary Diagnosis first to guide the AI.', 'Close', { duration: 3000 });
      return;
    }

    this.isGenerating.set(true);

    const prompt = `Act as an expert hospital discharge administrator and physician. 
Patient Name: ${patientName || 'Unknown Patient'}
Primary Diagnosis: ${diagnosis}
Procedures Performed (current): ${this.summaryForm.get('proceduresPerformed')?.value || 'None specified'}
Treatment Given (current): ${this.summaryForm.get('treatmentGiven')?.value || 'None specified'}

Generate a professional medical discharge summary. 
Provide a JSON object response strictly matching this structure:
{
  "proceduresPerformed": "Detailed summary of procedures performed.",
  "treatmentGiven": "Detailed description of the care and treatments administered during stay.",
  "followUpInstructions": "Clear, bulleted step-by-step instructions for the patient's home care, activity limits, diet, and symptoms to watch out for.",
  "notes": "A concise summary of patient condition on discharge and future recommendations."
}

Do not include any other text, markdown blocks, or explanation. Just valid JSON.`;

    this.aiService.postPrompt(prompt).subscribe({
      next: (res: string) => {
        this.isGenerating.set(false);
        try {
          if (res.includes('[DEMO MODE]')) {
            this.summaryForm.patchValue({
              proceduresPerformed: `Clinical diagnostics, vital signs monitoring, and physical stabilization for ${diagnosis}.`,
              treatmentGiven: `Administered patient-specific therapies, supportive care medication, and progressive monitoring.`,
              followUpInstructions: `• Limit physical exertion for 3 to 5 days.\n• Resume standard home medications; follow up in 7 days.\n• Check temperature twice daily.\n• Alert your clinic immediately if symptoms resume or fever develops.`,
              notes: `The patient responded well to therapeutic interventions and is fit for discharge.`
            });
            this.snackBar.open('Discharge summary auto-drafted (Demo Mode)!', 'Close', { duration: 3000 });
            return;
          }

          const cleanJson = res.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJson);
          this.summaryForm.patchValue({
            proceduresPerformed: parsed.proceduresPerformed || '',
            treatmentGiven: parsed.treatmentGiven || '',
            followUpInstructions: parsed.followUpInstructions || '',
            notes: parsed.notes || ''
          });
          this.snackBar.open('AI successfully drafted discharge summary!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
        } catch (_e) {
          this.snackBar.open('AI response format error. Please try again.', 'Close', { duration: 3000 });
        }
      },
      error: () => {
        this.isGenerating.set(false);
        this.snackBar.open('AI summary generation failed. Please try again.', 'Close', { duration: 3000 });
      }
    });
  }

  submit() {
    if (this.summaryForm.valid) {
      if (this.action === 'edit') {
        this.summaryService.updateDischargeSummary(this.summaryForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.summaryService.addDischargeSummary(this.summaryForm.getRawValue()).subscribe({
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
