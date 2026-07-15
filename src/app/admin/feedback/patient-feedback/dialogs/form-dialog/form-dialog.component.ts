import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { PatientFeedbackService } from '../../patient-feedback.service';
import { Validators, FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientFeedback } from '../../patient-feedback.model';
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
  patientFeedback: PatientFeedback;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-patient-feedback-form',
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
export class PatientFeedbackFormComponent {
  dialogRef = inject<MatDialogRef<PatientFeedbackFormComponent>>(MatDialogRef);
  data = inject<DialogData>(MAT_DIALOG_DATA);
  patientFeedbackService = inject(PatientFeedbackService);
  private fb = inject(FormBuilder);

  action: string;
  dialogTitle: string;
  patientFeedbackForm: FormGroup;
  patientFeedback: PatientFeedback;

  constructor() {
    const data = this.data;

    this.action = data.action;
    this.dialogTitle = this.action === 'edit' && data.patientFeedback ? 
      data.patientFeedback.feedback_id : 'New Feedback';
    this.patientFeedback = this.action === 'edit' && data.patientFeedback ? 
      data.patientFeedback : new PatientFeedback({});
    this.patientFeedbackForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.patientFeedback.id],
      feedback_id: [this.patientFeedback.feedback_id, [Validators.required]],
      patient_name: [this.patientFeedback.patient_name, [Validators.required]],
      feedback_date: [this.patientFeedback.feedback_date, [Validators.required]],
      category: [this.patientFeedback.category, [Validators.required]],
      rating: [this.patientFeedback.rating, [Validators.required]],
      status: [this.patientFeedback.status, [Validators.required]],
      feedback_text: [this.patientFeedback.feedback_text, [Validators.required]],
      reviewed_by: [this.patientFeedback.reviewed_by],
      action_taken: [this.patientFeedback.action_taken],
      notes: [this.patientFeedback.notes],
    });
  }

  submit() {
    if (this.patientFeedbackForm.valid) {
      if (this.action === 'edit') {
        this.patientFeedbackService.updatePatientFeedback(this.patientFeedbackForm.getRawValue()).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (_error) => {
          },
        });
      } else {
        this.patientFeedbackService.addPatientFeedback(this.patientFeedbackForm.getRawValue()).subscribe({
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
